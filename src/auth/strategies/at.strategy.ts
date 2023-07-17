import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { DbService } from 'src/db/db.service';

type JwtPayload = {
  sub: string;
  username: string;
  iat: any;
  exp: any;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(config: ConfigService, private db: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: config.get('WBMS_JWT_AT_KEY'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'at' in req.cookies) return req.cookies.at;

    return null;
  }

  async validate(payload: JwtPayload) {
    // ini seharusnya diawal aja, ditaro di payload,
    // karena kl seperti ini costnya setiap panggil api akan call db process
    // process audit trail bisa disini
    console.log(payload);
    const user = await this.db.user.findFirst({
      where: { id: payload.sub, hashedRT: { not: null } },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return user;
  }
}
