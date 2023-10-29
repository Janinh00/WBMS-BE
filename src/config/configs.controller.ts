import { Body, Get, Param, Post, Controller, Patch, Delete } from '@nestjs/common';
import { ConfigsService } from './configs.service';

@Controller('api/configs')
export class ConfigsController {
  constructor(private configsService: ConfigsService) {}

  @Get('')
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const results = await this.configsService.getAll();

      dataOut.data = results;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;

    return;
  }

  @Get('env')
  getEnv() {
    return this.configsService.getEnv();
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.configsService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.configsService.searchFirst(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.configsService.getById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.configsService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.configsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.configsService.deleteById(id);
  }
}
