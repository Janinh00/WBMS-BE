import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { WeighbridgesService } from './weighbridges.service';

@Controller('api/weighbridges')
export class WeighbridgesController {
  constructor(private weighbridgesService: WeighbridgesService) {}

  @Get('')
  getAll() {
    return this.weighbridgesService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.weighbridgesService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.weighbridgesService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.weighbridgesService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.weighbridgesService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.weighbridgesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.weighbridgesService.deleteById(id);
  }
}
