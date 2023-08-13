import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { DbService } from 'src/db/db.service';
import { WBMS_JWT_AT_KEY } from 'src/utils/constants';

type JwtPayload = {
  sub: string;
  username: string;
  iat: any;
  exp: any;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private db: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: WBMS_JWT_AT_KEY
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'at' in req.cookies) return req.cookies.at;

    return null;
  }

  async validate(payload: JwtPayload) {
    // ini seharusnya diawal aja, ditaro di payload,
    // karena kl seperti ini costnya tinggi setiap panggil api akan call db process
    // console.log(payload);
    // const user = await this.db.user.findFirst({
    //   where: { id: payload.sub, hashedRT: { not: null } },
    //   select: {
    //     id: true,
    //     username: true,
    //     email: true,
    //     role: true
    //   }
    // });

    // return user;
    return { id: payload.sub, username: payload.username };
  }
}
