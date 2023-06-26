import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomerGroupsService } from './customerGroups.service';

@Controller('api/customergroups')
export class CustomerGroupsController {
  constructor(private customerGroupsService: CustomerGroupsService) {}

  @Get('')
  getAll() {
    return this.customerGroupsService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.customerGroupsService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.customerGroupsService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerGroupsService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.customerGroupsService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.customerGroupsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.customerGroupsService.deleteById(id);
  }
}
