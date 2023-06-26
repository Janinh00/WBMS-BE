import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { StorageTanksService } from './storageTanks.service';

@Controller('api/countries')
export class StorageTanksController {
  constructor(private storageTanksService: StorageTanksService) {}

  @Get('')
  getAll() {
    return this.storageTanksService.getAll();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.storageTanksService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.storageTanksService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.storageTanksService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.storageTanksService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.storageTanksService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.storageTanksService.deleteById(id);
  }
}
