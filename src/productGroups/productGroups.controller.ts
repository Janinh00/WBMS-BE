import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductGroupsService } from './productGroups.service';

@Controller('api/product-groups')
export class ProductGroupsController {
  constructor(private productGroupsService: ProductGroupsService) {}
  @Get('')
  getAll() {
    return this.productGroupsService.getAll();
  }

  @Get('deleted')
  getAllDeleted() {
    return this.productGroupsService.getAllDeleted();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productGroupsService.getById(id);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.productGroupsService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.productGroupsService.searchFirst(query);
  }

  @Post('search-deleted')
  searchDeleted(@Body() query: any) {
    return this.productGroupsService.searchDeleted(query);
  }

  @Post()
  create(@Body() dto: any) {
    return this.productGroupsService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.productGroupsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.productGroupsService.deleteById(id);
  }
}
