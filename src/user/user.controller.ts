import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Param,
  Post,
  Delete,
  Patch,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';
import { AtGuard } from 'src/common/guards';

@ApiTags('Users')
@UseGuards(AtGuard)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          page: 0,
          totalRecords: 0,
          records: []
        }
      },
      logs: {}
    };

    try {
      const users = await this.userService.getAll();

      dataOut.data.user.totalRecords = users.length;
      dataOut.data.user.records = users;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('deleted')
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          page: 0,
          totalRecords: 0,
          records: []
        }
      },
      logs: {}
    };

    try {
      dataOut.data.user.records = await this.userService.getAllDeleted();
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async getById(@Param('id') userId: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const user = await this.userService.getById(userId);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = {
        username,
        email,
        name,
        division,
        position,
        phone
      };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('search-first')
  @ApiCreatedResponse({ type: UserEntity })
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const record = await this.userService.searchFirst(query);

      if (record) {
        dataOut.data.user = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.userService.searchMany(query);

      dataOut.data.user.records = records;
      dataOut.data.user.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  @ApiCreatedResponse({ type: UserEntity })
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const record = await this.userService.searchFirstDeleted(query);

      if (record) {
        dataOut.data.user = record;
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.userService.searchManyDeleted(query);

      dataOut.data.user.records = records;
      dataOut.data.user.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() dto: CreateUserDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const userId = req.user['id'];
      const user = await this.userService.create(dto, userId);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = { username, email, name, division, position, phone };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: UserEntity })
  async updateById(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const userId = req.user['id'];
      const user = await this.userService.updateById(id, dto, userId);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = { username, email, name, division, position, phone };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: UserEntity })
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const userId = req.user['id'];
      const user = await this.userService.deleteById(id, userId);

      const { username, email, name, isDisabled, isDeleted } = user;

      dataOut.data.user = { username, email, name, isDisabled, isDeleted };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqParams: { id: id }, error };
    }

    return dataOut;
  }
}
