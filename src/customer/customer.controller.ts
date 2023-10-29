import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { CustomerEntity } from './entities';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('')
  @ApiCreatedResponse({ type: CustomerEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerService.getAll();

      dataOut.data.customer.records = records;
      dataOut.data.customer.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: CustomerEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerService.getAllDeleted();

      dataOut.data.customer.records = records;
      dataOut.data.customer.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CustomerEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const record = await this.customerService.getById(id);

      dataOut.data.customer = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: CustomerEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const record = await this.customerService.searchFirst(query);

      if (record) {
        dataOut.data.customer = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: CustomerEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerService.searchMany(query);

      dataOut.data.customer.records = records;
      dataOut.data.customer.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: CustomerEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const record = await this.customerService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.customer = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: CustomerEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerService.searchManyDeleted(query);

      dataOut.data.customer.records = records;
      dataOut.data.customer.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: CustomerEntity })
  async create(@Body() dto: CreateCustomerDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerService.create(dto, userId);

      dataOut.data.customer = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CustomerEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCustomerDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerService.updateById(id, dto, userId);

      dataOut.data.customer = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CustomerEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customer: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerService.deleteById(id, userId);

      dataOut.data.customer = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
