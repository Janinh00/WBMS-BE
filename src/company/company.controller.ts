import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { CompanyEntity } from './entities';

@ApiTags('Companies')
@Controller('api/companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('')
  @ApiCreatedResponse({ type: CompanyEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.companyService.getAll();

      dataOut.data.company.records = records;
      dataOut.data.company.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
    return this.companyService.getAll();
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: CompanyEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.companyService.getAllDeleted();

      dataOut.data.company.records = records;
      dataOut.data.company.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CompanyEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const record = await this.companyService.getById(id);

      dataOut.data.company = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: CompanyEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const record = await this.companyService.searchFirst(query);

      if (record) {
        dataOut.data.company = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: CompanyEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.companyService.searchMany(query);

      dataOut.data.company.records = records;
      dataOut.data.company.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: CompanyEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const record = await this.companyService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.company = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: CompanyEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.companyService.searchManyDeleted(query);

      dataOut.data.company.records = records;
      dataOut.data.company.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: CompanyEntity })
  async create(@Body() dto: CreateCompanyDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.companyService.create(dto, userId);

      dataOut.data.company = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CompanyEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCompanyDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.companyService.updateById(id, dto, userId);

      dataOut.data.company = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CompanyEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        company: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.companyService.deleteById(id, userId);

      dataOut.data.company = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
