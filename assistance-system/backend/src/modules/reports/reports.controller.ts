import { Controller, Get, Query, Res, Headers, UnauthorizedException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import type { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('export')
  async exportReport(
    @Res() res: Response,
    @Headers('authorization') authHeader: string,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    if (authHeader !== 'Bearer admin-secret-token') {
      throw new UnauthorizedException('No autenticado');
    }
    return this.reportsService.generateExcelReport(res, startDate, endDate);
  }
}
