import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  getAll() {
    return this.productsService.getAll();
  }

  @Get('deleted')
  getAllDeleted() {
    return this.productsService.getAllDeleted();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.productsService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.productsService.searchFirst(query);
  }

  @Post('search-deleted')
  searchDeleted(@Body() query: any) {
    return this.productsService.searchDeleted(query);
  }

  @Post()
  create(@Body() dto: any) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.productsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.productsService.deleteById(id);
  }
}
