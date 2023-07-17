import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { DriverService } from './driver.service';
import { CreateDriverDto, UpdateDriverDto } from './dto';
import { DriverEntity } from './entities';

@ApiTags('Drivers')
@Controller('api/driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('')
  @ApiCreatedResponse({ type: DriverEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.driverService.getAll();

      dataOut.data.driver.records = records;
      dataOut.data.driver.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: DriverEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.driverService.getAllDeleted();

      dataOut.data.driver.records = records;
      dataOut.data.driver.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: DriverEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: null
      },
      logs: {}
    };

    try {
      const record = await this.driverService.getById(id);

      dataOut.data.driver = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: DriverEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const record = await this.driverService.searchFirst(query);

      if (record) {
        dataOut.data.driver.records.push(record);
        dataOut.data.driver.totalRecords = 1;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: DriverEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.driverService.searchMany(query);

      dataOut.data.driver.records = records;
      dataOut.data.driver.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: DriverEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const record = await this.driverService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.driver.records.push(record);
        dataOut.data.driver.totalRecords = 1;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: DriverEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.driverService.searchManyDeleted(query);

      dataOut.data.driver.records = records;
      dataOut.data.driver.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: DriverEntity })
  async create(@Body() dto: CreateDriverDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.driverService.create(dto, userId);

      dataOut.data.driver = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: DriverEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateDriverDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      console.log(id);
      const record = await this.driverService.updateById(id, dto, userId);

      dataOut.data.driver = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DriverEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        driver: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.driverService.deleteById(id, userId);

      dataOut.data.driver = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
