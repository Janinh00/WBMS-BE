import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto';
import { CityEntity } from './entities';

@ApiTags('Cities')
@Controller('api/cities')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get('')
  @ApiCreatedResponse({ type: CityEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.cityService.getAll();

      dataOut.data.city.records = records;
      dataOut.data.city.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: CityEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.cityService.getAllDeleted();

      dataOut.data.city.records = records;
      dataOut.data.city.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CityEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const record = await this.cityService.getById(id);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: CityEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const record = await this.cityService.searchFirst(query);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: CityEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.cityService.searchMany(query);

      dataOut.data.city.records = records;
      dataOut.data.city.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: CityEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const record = await this.cityService.searchFirstDeleted(query);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: CityEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.cityService.searchManyDeleted(query);

      dataOut.data.city.records = records;
      dataOut.data.city.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: CityEntity })
  async create(@Body() dto: CreateCityDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.cityService.create(dto, userId);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CityEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCityDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.cityService.updateById(id, dto, userId);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CityEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        city: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.cityService.deleteById(id, userId);

      dataOut.data.city = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
