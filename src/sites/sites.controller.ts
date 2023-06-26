import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto';

@ApiTags('Sites')
@Controller('api/sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get('')
  getAll() {
    return this.sitesService.getAll();
  }

  @Get('deleted')
  getAllDeleted() {
    return this.sitesService.getAllDeleted();
  }

  @Get('sync-with-semai')
  syncWithSemai() {
    return this.sitesService.syncWithSemai();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sitesService.getById(id);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.sitesService.searchFirst(query);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.sitesService.searchMany(query);
  }

  @Post('search-first-deleted')
  searchFirstDeleted(@Body() query: any) {
    return this.sitesService.searchFirstDeleted(query);
  }

  @Post('search-many-deleted')
  searchManyDeleted(@Body() query: any) {
    return this.sitesService.searchManyDeleted(query);
  }

  @Post()
  create(@Body() dto: CreateSiteDto) {
    return this.sitesService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.sitesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.sitesService.deleteById(id);
  }
}