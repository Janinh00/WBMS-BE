import { Body, Get, Param, Post, Controller, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { SiteService } from './site.service';
import { CreateSiteDto, UpdateSiteDto } from './dto';
import { SiteEntity } from './entities';

@ApiTags('Sites')
@Controller('api/sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get('edispatch-sync')
  async eDispatchSync(@Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const status = await this.siteService.eDispatchSync(userId);

      // dataOut.data.site.records = records;
      // dataOut.data.site.totalRecords = records.length;
      dataOut.status = !!status;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('')
  @ApiCreatedResponse({ type: SiteEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.siteService.getAll();

      dataOut.data.site.records = records;
      dataOut.data.site.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: SiteEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.siteService.getAllDeleted();

      dataOut.data.site.records = records;
      dataOut.data.site.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: SiteEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const record = await this.siteService.getById(id);

      dataOut.data.site = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: SiteEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const record = await this.siteService.searchFirst(query);

      if (record) {
        dataOut.data.site = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: SiteEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.siteService.searchMany(query);

      dataOut.data.site.records = records;
      dataOut.data.site.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: SiteEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const record = await this.siteService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.site = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: SiteEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.siteService.searchManyDeleted(query);

      dataOut.data.site.records = records;
      dataOut.data.site.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: SiteEntity })
  async create(@Body() dto: CreateSiteDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.siteService.create(dto, userId);

      dataOut.data.site = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SiteEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateSiteDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      console.log(id);
      const record = await this.siteService.updateById(id, dto, userId);

      dataOut.data.site = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: SiteEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        site: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.siteService.deleteById(id, userId);

      dataOut.data.site = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }
}
