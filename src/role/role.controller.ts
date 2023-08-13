import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleEntity } from './entities';

@ApiTags('Roles')
@Controller('api/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('')
  @ApiCreatedResponse({ type: RoleEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.roleService.getAll();

      dataOut.data.role.records = records;
      dataOut.data.role.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: RoleEntity })
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: null
      },
      logs: {}
    };

    try {
      const record = await this.roleService.getById(id);

      dataOut.data.role = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: RoleEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: null
      },
      logs: {}
    };

    try {
      const record = await this.roleService.searchFirst(query);

      if (record) {
        dataOut.data.role = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: RoleEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.roleService.searchMany(query);

      dataOut.data.role.records = records;
      dataOut.data.role.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() dto: CreateRoleDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.roleService.create(dto, userId);

      dataOut.data.role = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: RoleEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateRoleDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.roleService.updateById(id, dto, userId);

      dataOut.data.role = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: RoleEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        role: null
      },
      logs: {}
    };

    try {
      const userId = ''; // req.user['id'];
      const record = await this.roleService.deleteById(id, userId);

      dataOut.data.role = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqParams: { id }, error };
    }

    return dataOut;
  }
}
