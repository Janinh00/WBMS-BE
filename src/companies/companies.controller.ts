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

import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@ApiTags('Companies')
@Controller('api/companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get('')
  getAll() {
    return this.companiesService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.companiesService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.companiesService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.companiesService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.companiesService.deleteById(id);
  }
}
