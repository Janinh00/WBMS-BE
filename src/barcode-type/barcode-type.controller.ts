import { Body, Get, Param, Post, Controller, Patch, Delete } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { BarcodeTypeService } from './barcode-type.service';

@ApiTags('Barcode Types')
@Controller('api/barcodetypes')
export class BarcodeTypeController {
  constructor(private customerTypeService: BarcodeTypeService) {}

  @Get('')
  getAll() {
    return this.customerTypeService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.customerTypeService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.customerTypeService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerTypeService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.customerTypeService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.customerTypeService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.customerTypeService.deleteById(id);
  }
}
