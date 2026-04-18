import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':documentId')
  async getEmployee(@Param('documentId') documentId: string) {
    return this.employeesService.findByDocumentId(documentId);
  }
}
