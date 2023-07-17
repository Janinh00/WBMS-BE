import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { StorageTanksService } from './storageTanks.service';
import { CreateStorageTankDto, UpdateStorageTankDto } from './dto';
import { StorageTankEntity } from './entities';

@ApiTags('Storage Tanks')
@Controller('api/storage-tanks')
export class StorageTanksController {
  constructor(private storageTanksService: StorageTanksService) {}

  @Get('')
  @ApiCreatedResponse({ type: StorageTankEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.storageTanksService.getAll();

      dataOut.data.storageTank.records = records;
      dataOut.data.storageTank.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: StorageTankEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.storageTanksService.getAllDeleted();

      dataOut.data.storageTank.records = records;
      dataOut.data.storageTank.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: StorageTankEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: null
      },
      logs: {}
    };

    try {
      const record = await this.storageTanksService.getById(id);

      dataOut.data.storageTank = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: StorageTankEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const record = await this.storageTanksService.searchFirst(query);

      if (record) {
        dataOut.data.storageTank.records.push(record);
        dataOut.data.storageTank.totalRecords = 1;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: StorageTankEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.storageTanksService.searchMany(query);

      dataOut.data.storageTank.records = records;
      dataOut.data.storageTank.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: StorageTankEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const record = await this.storageTanksService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.storageTank.records.push(record);
        dataOut.data.storageTank.totalRecords = 1;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: StorageTankEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.storageTanksService.searchManyDeleted(query);

      dataOut.data.storageTank.records = records;
      dataOut.data.storageTank.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: StorageTankEntity })
  async create(@Body() dto: CreateStorageTankDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.storageTanksService.create(dto, userId);

      dataOut.data.storageTank = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: StorageTankEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateStorageTankDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      console.log(id);
      const record = await this.storageTanksService.updateById(id, dto, userId);

      dataOut.data.storageTank = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: StorageTankEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTank: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.storageTanksService.deleteById(id, userId);

      dataOut.data.storageTank = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
