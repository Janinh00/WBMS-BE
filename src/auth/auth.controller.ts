import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';
import { AtGuard, RtGuard } from 'src/common/guards';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('iam')
  @UseGuards(AtGuard)
  async getIAM(@Req() req: Request) {
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
      const user = await this.authService.getIAM(userId);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = { username, email, name, division, position, phone };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        user: null
      },
      logs: {}
    };

    try {
      const user = await this.authService.signup(dto);

      const { username, email, name, division, position, phone } = user;

      dataOut.data.user = { username, email, name, division, position, phone };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        tokens: null,
        user: null
      },
      logs: {}
    };

    try {
      const { tokens, user } = await this.authService.signin(dto, res);

      dataOut.data.tokens = tokens;
      dataOut.data.user = user;
      // dataOut.data = { tokens, user };
      dataOut.message = 'Signed in successfully.';
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('signout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  async signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const userId = req.user['id'];
      const isSuccess = await this.authService.signout(userId, res);

      if (isSuccess) {
        dataOut.message = 'Signed out successfully.';
      } else {
        dataOut.status = false;
        dataOut.message = 'Already signed out.';
      }
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        tokens: null
      },
      logs: {}
    };

    try {
      const userId = req.user['id'];
      const refreshToken = req.user['refreshToken'];
      const tokens = await this.authService.refreshToken(userId, refreshToken, res);

      dataOut.data.tokens = tokens;
      dataOut.message = 'Token refreshed successfully.';
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }
}
