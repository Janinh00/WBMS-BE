import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('api/customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('')
  getAll() {
    return this.customersService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.customersService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.customersService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customersService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.customersService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.customersService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.customersService.deleteById(id);
  }
}
