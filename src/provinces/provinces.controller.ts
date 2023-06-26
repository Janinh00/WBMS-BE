import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ProvincesService } from './provinces.service';
import { CreateProvinceDto, UpdateProvinceDto } from './dto';
import { ProvinceEntity } from './entities';

@ApiTags('Provinces')
@Controller('api/provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  getAll() {
    return this.provincesService.getAll();
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  getAllDeleted() {
    return this.provincesService.getAllDeleted();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  getById(@Param('id') id: string) {
    return this.provincesService.getById(id);
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: ProvinceEntity })
  searchFirst(@Body() query: any) {
    return this.provincesService.searchFirst(query);
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  searchMany(@Body() query: any) {
    return this.provincesService.searchMany(query);
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: ProvinceEntity })
  searchFirstDeleted(@Body() query: any) {
    return this.provincesService.searchFirstDeleted(query);
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  searchDeleted(@Body() query: any) {
    return this.provincesService.searchManyDeleted(query);
  }

  @Post()
  @ApiCreatedResponse({ type: ProvinceEntity })
  create(@Body() dto: CreateProvinceDto) {
    return this.provincesService.create(dto);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  updateById(@Param('id') id: string, @Body() dto: UpdateProvinceDto) {
    return this.provincesService.updateById(id, dto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  deleteById(@Param('id') id: string) {
    return this.provincesService.deleteById(id);
  }
}
