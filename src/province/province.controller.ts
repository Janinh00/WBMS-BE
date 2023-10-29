import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ProvinceService } from './province.service';
import { CreateProvinceDto, UpdateProvinceDto } from './dto';
import { ProvinceEntity } from './entities';

@ApiTags('Provinces')
@Controller('api/provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.provinceService.getAll();

      dataOut.data.province.records = records;
      dataOut.data.province.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.provinceService.getAllDeleted();

      dataOut.data.province.records = records;
      dataOut.data.province.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const record = await this.provinceService.getById(id);

      dataOut.data.province = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: ProvinceEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const record = await this.provinceService.searchFirst(query);

      if (record) {
        dataOut.data.province = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.provinceService.searchMany(query);

      dataOut.data.province.records = records;
      dataOut.data.province.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: ProvinceEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const record = await this.provinceService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.province = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: ProvinceEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.provinceService.searchManyDeleted(query);

      dataOut.data.province.records = records;
      dataOut.data.province.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: ProvinceEntity })
  async create(@Body() dto: CreateProvinceDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.provinceService.create(dto, userId);

      dataOut.data.province = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateProvinceDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.provinceService.updateById(id, dto, userId);

      dataOut.data.province = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProvinceEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        province: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.provinceService.deleteById(id, userId);

      dataOut.data.province = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqParams: { id }, error };
    }

    return dataOut;
  }
}
