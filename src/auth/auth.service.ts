import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';

import { DbService } from 'src/db/db.service';
import { SigninDto } from './dto';
import { Tokens } from './types';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private config: ConfigService,
    private usersService: UserService
  ) {}

  async signup(dto: CreateUserDto): Promise<UserEntity> {
    const userId = '';

    const user = await this.usersService.create(dto, userId);

    return user;

    // const tokens = await this.signTokens(user.id, user.username);
    // await this.updateRtHash(user.id, tokens.refresh_token);
    // return tokens;
  }

  async signin(dto: SigninDto, res: Response): Promise<{ tokens: Tokens; user: any }> {
    // find the user by username
    const user = await this.db.user.findFirst({
      where: {
        OR: [{ username: dto.username }, { email: dto.email }, { nik: dto.nik }]
      },
      select: {
        id: true,
        username: true,
        email: true,
        nik: true,
        name: true,
        role: true,
        hashedPassword: true
      }
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Invalid username or password.');

    // compare password
    const pwMatches = await verify(user.hashedPassword, dto.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Invalid username or password.');

    // send back the user
    delete user.hashedPassword; // Didelete karena risk untuk dimanfaatkan
    // return user; // Tidak perlu lg karena sudah pakai return jwt token

    // using access_token and refresh_token now, not just single jwt token
    // return this.signToken(user.id, user.username);

    const tokens = await this.signTokens(user.id, user.username);

    await this.updateRtHash(user.id, tokens.refresh_token); // Update (men-set) hashedRT di user yang login

    res.cookie('at', tokens.access_token, { httpOnly: true, sameSite: 'lax', maxAge: 5 * 60 * 1000 });
    res.cookie('rt', tokens.refresh_token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return { tokens, user };
  }

  async getIAM(userId: string): Promise<UserEntity> {
    const user = await this.usersService.getIAM(userId);

    return user;
  }

  async signout(userId: string, res: Response): Promise<boolean> {
    const updatedCount = await this.db.user.updateMany({
      where: {
        id: userId,
        hashedRT: {
          not: null
        }
      },
      data: {
        hashedRT: null
      }
    });

    res.clearCookie('at', { httpOnly: true, sameSite: 'lax' });
    res.clearCookie('rt', { httpOnly: true, sameSite: 'lax' });

    return updatedCount.count > 0 ? true : false;
  }

  async refreshToken(userId: string, rt: string, res: Response): Promise<Tokens> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await verify(user.hashedRT, rt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.signTokens(user.id, user.username);

    await this.updateRtHash(user.id, tokens.refresh_token);

    res.cookie('at', tokens.access_token, { httpOnly: true, sameSite: 'lax', maxAge: 5 * 60 * 1000 });
    res.cookie('rt', tokens.refresh_token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hashedRT = await hash(rt); //refreshToken (RT) dihash ketika disave di DB

    await this.db.user.update({
      where: { id: userId },
      data: { hashedRT }
    });
  }

  async signToken(userId: string, username: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, username };

    const secret = this.config.get('WBMS_JWT_KEY');
    const token = await this.jwt.signAsync(payload, { secret, expiresIn: '15m' });

    return { access_token: token };
  }

  async signTokens(userId: string, username: string): Promise<Tokens> {
    const payload = { sub: userId, username };

    const secret_at = this.config.get('WBMS_JWT_AT_KEY');
    const secret_rt = this.config.get('WBMS_JWT_RT_KEY');

    const [at, rt] = await Promise.all([
      // 60s*15 = 15m
      await this.jwt.signAsync(payload, { secret: secret_at, expiresIn: 1 * 60 }),
      await this.jwt.signAsync(payload, { secret: secret_rt, expiresIn: 7 * 24 * 60 * 60 })
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
