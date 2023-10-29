import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CustomerGroupService } from './customer-group.service';
import { CreateCustomerGroupDto, UpdateCustomerGroupDto } from './dto';
import { CustomerGroupEntity } from './entities';

@ApiTags('Customer Groups')
@Controller('api/customer-groups')
export class CustomerGroupController {
  constructor(private customerGroupService: CustomerGroupService) {}

  @Get('')
  @ApiCreatedResponse({ type: CustomerGroupEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerGroupService.getAll();

      dataOut.data.customerGroup.records = records;
      dataOut.data.customerGroup.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: CustomerGroupEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerGroupService.getAllDeleted();

      dataOut.data.customerGroup.records = records;
      dataOut.data.customerGroup.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const record = await this.customerGroupService.getById(id);

      dataOut.data.customerGroup = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const record = await this.customerGroupService.searchFirst(query);

      if (record) {
        dataOut.data.customerGroup = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: CustomerGroupEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerGroupService.searchMany(query);

      dataOut.data.customerGroup.records = records;
      dataOut.data.customerGroup.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const record = await this.customerGroupService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.customerGroup = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: CustomerGroupEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.customerGroupService.searchManyDeleted(query);

      dataOut.data.customerGroup.records = records;
      dataOut.data.customerGroup.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async create(@Body() dto: CreateCustomerGroupDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerGroupService.create(dto, userId);

      dataOut.data.customerGroup = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCustomerGroupDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.customerGroupService.updateById(id, dto, userId);

      dataOut.data.customerGroup = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CustomerGroupEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        customerGroup: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.customerGroupService.deleteById(id, userId);

      dataOut.data.customerGroup = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
