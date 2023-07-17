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
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { AtGuard } from 'src/common/guards';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('Users')
@UseGuards(AtGuard)
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('iam')
  async getIAM(@Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null,
      },
      logs: {},
    };

    try {
      const user = await this.usersService.getIAM(req.user['id']);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = { username, email, name, division, position, phone };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get()
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          page: 0,
          totalRecords: 0,
          records: [],
        },
      },
      logs: {},
    };

    try {
      const users = await this.usersService.getAll();

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
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          page: 0,
          totalRecords: 0,
          records: [],
        },
      },
      logs: {},
    };

    try {
      dataOut.data.user.records = await this.usersService.getAllDeleted();
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  async getById(@Param('id') userId: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: {
          page: 0,
          totalRecords: 0,
          records: [],
        },
      },
      logs: {},
    };

    try {
      const user = await this.usersService.getById(userId);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user.records.push({
        username,
        email,
        name,
        division,
        position,
        phone,
      });
      dataOut.data.user.totalRecords = 1;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.usersService.searchFirst(query);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.usersService.searchMany(query);
  }

  @Post('search-first-deleted')
  searchFirstDeleted(@Body() query: any) {
    return this.usersService.searchFirstDeleted(query);
  }

  @Post('search-many-deleted')
  searchDeleted(@Body() query: any) {
    return this.usersService.searchManyDeleted(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null,
      },
      logs: {},
    };

    try {
      const user = await this.usersService.create(dto);

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
  async updateById(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null,
      },
      logs: {},
    };

    try {
      const user = await this.usersService.updateById(userId, dto);

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
  async deleteById(@Param('id') userId: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null,
      },
      logs: {},
    };

    try {
      const user = await this.usersService.deleteById(userId);

      const { username, email, name, isDisabled, isDeleted } = user;

      dataOut.data.user = { username, email, name, isDisabled, isDeleted };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqParam: { userId }, error };
    }

    return dataOut;
  }
}
