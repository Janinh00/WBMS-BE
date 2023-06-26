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

import { CitiesService } from './cities.service';

@Controller('api/cities')
@ApiTags('Cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('')
  getAll() {
    return this.citiesService.getAll();
  }

  @Get('deleted')
  getAllDeleted() {
    return this.citiesService.getAllDeleted();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.citiesService.getById(id);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.citiesService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.citiesService.searchFirst(query);
  }

  @Post('search-deleted')
  searchDeleted(@Body() query: any) {
    return this.citiesService.searchDeleted(query);
  }

  @Post()
  create(@Body() dto: any) {
    return this.citiesService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.citiesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.citiesService.deleteById(id);
  }
}
