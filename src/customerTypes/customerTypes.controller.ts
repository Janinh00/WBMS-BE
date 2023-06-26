import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomerTypesService } from './customerTypes.service';

@Controller('api/customertypes')
export class CustomerTypesController {
  constructor(private customerTypesService: CustomerTypesService) {}

  @Get('')
  getAll() {
    return this.customerTypesService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.customerTypesService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.customerTypesService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerTypesService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.customerTypesService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.customerTypesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.customerTypesService.deleteById(id);
  }
}
