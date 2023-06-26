import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { MillsService } from './mills.service';

@Controller('api/mills')
export class MillsController {
  constructor(private millsService: MillsService) {}

  @Get('')
  getAll() {
    return this.millsService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.millsService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.millsService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.millsService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.millsService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.millsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.millsService.deleteById(id);
  }
}
