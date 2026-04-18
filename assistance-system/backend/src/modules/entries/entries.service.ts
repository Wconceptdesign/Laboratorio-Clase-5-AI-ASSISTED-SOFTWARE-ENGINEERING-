import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export class CreateEntryDto {
  documentId: string;
  hasLaptop: boolean;
  laptopBrand?: string;
  laptopSerial?: string;
  authorizedBy?: string;
}

export class ExitEntryDto {
  withdrawLaptop: boolean;
  verifiedBy?: string;
}

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async createEntry(data: CreateEntryDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { document_id: data.documentId }
    });

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    // Checking for an open entry today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const openEntry = await this.prisma.entry.findFirst({
      where: {
        employee_id: employee.id,
        exit_time: null,
        entry_time: { gte: startOfDay }
      }
    });

    if (openEntry) {
      throw new BadRequestException('El empleado ya tiene un ingreso abierto activo');
    }

    if (data.hasLaptop) {
      if (!data.laptopBrand || !data.laptopSerial || !data.authorizedBy) {
        throw new BadRequestException('Se requieren todos los detalles del computador');
      }
    }

    return this.prisma.entry.create({
      data: {
        employee_id: employee.id,
        has_laptop: data.hasLaptop,
        laptop_brand: data.hasLaptop ? data.laptopBrand : null,
        laptop_serial: data.hasLaptop ? data.laptopSerial : null,
        authorized_by: data.hasLaptop ? data.authorizedBy : null,
      }
    });
  }

  async getOpenEntry(documentId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { document_id: documentId }
    });
    if (!employee) throw new NotFoundException('Empleado no encontrado');

    const openEntry = await this.prisma.entry.findFirst({
      where: {
        employee_id: employee.id,
        exit_time: null
      }
    });
    return openEntry; // can be null
  }

  async exitEntry(id: string, data: ExitEntryDto) {
    const entry = await this.prisma.entry.findUnique({ where: { id } });
    if (!entry) throw new NotFoundException('Registro no encontrado');
    if (entry.exit_time) throw new BadRequestException('El registro ya fue cerrado');

    if (entry.has_laptop) {
      if (data.withdrawLaptop && !data.verifiedBy) {
        throw new BadRequestException('Se requiere el nombre de quien verifica el retiro del equipo');
      }
    }

    return this.prisma.entry.update({
      where: { id },
      data: {
        exit_time: new Date(),
        withdraw_laptop: data.withdrawLaptop,
        verified_by: data.verifiedBy,
      }
    });
  }
}
