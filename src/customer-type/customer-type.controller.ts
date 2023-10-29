import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CustomerTypeService } from './customer-type.service';
import { CreateCustomerTypeDto, UpdateCustomerTypeDto } from './dto';
import { CustomerTypeEntity } from './entities';

@ApiTags('Customer Types')
@Controller('api/customer-types')
export class CustomerTypeController {
  constructor(private customerTypeService: CustomerTypeService) {}

  @Get('')
  @ApiCreatedResponse({ type: CustomerTypeEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerTypeService.getAll();

      dataOut.data.customerType.records = records;
      dataOut.data.customerType.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: CustomerTypeEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerTypeService.getAllDeleted();

      dataOut.data.customerType.records = records;
      dataOut.data.customerType.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const record = await this.customerTypeService.getById(id);

      dataOut.data.customerType = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const record = await this.customerTypeService.searchFirst(query);

      if (record) {
        dataOut.data.customerType = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: CustomerTypeEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerTypeService.searchMany(query);

      dataOut.data.customerType.records = records;
      dataOut.data.customerType.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const record = await this.customerTypeService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.customerType = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: CustomerTypeEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerTypeService.searchManyDeleted(query);

      dataOut.data.customerType.records = records;
      dataOut.data.customerType.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async create(@Body() dto: CreateCustomerTypeDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerTypeService.create(dto, userId);

      dataOut.data.customerType = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCustomerTypeDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerTypeService.updateById(id, dto, userId);

      dataOut.data.customerType = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CustomerTypeEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerType: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.customerTypeService.deleteById(id, userId);

      dataOut.data.customerType = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
