import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
// Required: npm install exceljs
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async generateExcelReport(res: Response, startDate?: string, endDate?: string) {
    const whereClause: any = {};
    if (startDate && endDate) {
      whereClause.entry_time = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const entries = await this.prisma.entry.findMany({
      where: whereClause,
      include: { employee: true },
      orderBy: { entry_time: 'desc' }
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Registros Asistencia');

    sheet.columns = [
      { header: 'Fecha Ingreso', key: 'entryDate', width: 20 },
      { header: 'Hora Ingreso', key: 'entryTime', width: 15 },
      { header: 'Documento', key: 'documentId', width: 20 },
      { header: 'Nombres', key: 'fullName', width: 30 },
      { header: 'Trae Computador', key: 'hasLaptop', width: 15 },
      { header: 'Marca', key: 'laptopBrand', width: 15 },
      { header: 'Serial', key: 'laptopSerial', width: 20 },
      { header: 'Autoriza Ingreso', key: 'authorizedBy', width: 20 },
      { header: 'Hora Salida', key: 'exitTime', width: 15 },
      { header: 'Retira Computador', key: 'withdrawLaptop', width: 15 },
      { header: 'Verifica Retiro', key: 'verifiedBy', width: 20 },
    ];

    entries.forEach((entry: any) => {
      sheet.addRow({
        entryDate: entry.entry_time.toLocaleDateString(),
        entryTime: entry.entry_time.toLocaleTimeString(),
        documentId: entry.employee.document_id,
        fullName: entry.employee.full_name,
        hasLaptop: entry.has_laptop ? 'Sí' : 'No',
        laptopBrand: entry.laptop_brand || 'N/A',
        laptopSerial: entry.laptop_serial || 'N/A',
        authorizedBy: entry.authorized_by || 'N/A',
        exitTime: entry.exit_time ? entry.exit_time.toLocaleTimeString() : 'En progreso',
        withdrawLaptop: entry.withdraw_laptop !== null ? (entry.withdraw_laptop ? 'Sí' : 'No') : 'N/A',
        verifiedBy: entry.verified_by || 'N/A',
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'registro_asistencia.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
