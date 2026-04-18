import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { EntriesService, CreateEntryDto, ExitEntryDto } from './entries.service';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async registerEntry(@Body() body: CreateEntryDto) {
    return this.entriesService.createEntry(body);
  }

  @Get('open/:documentId')
  async getOpenEntry(@Param('documentId') documentId: string) {
    const entry = await this.entriesService.getOpenEntry(documentId);
    return entry || { open: false };
  }

  @Patch(':id/exit')
  async registerExit(@Param('id') id: string, @Body() body: ExitEntryDto) {
    return this.entriesService.exitEntry(id, body);
  }
}
