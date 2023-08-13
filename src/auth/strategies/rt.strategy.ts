import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { WBMS_JWT_RT_KEY } from 'src/utils/constants';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: WBMS_JWT_RT_KEY,
      passReqToCallback: true
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'rt' in req.cookies) return req.cookies.rt;

    return null;
  }

  async validate(req: Request, payload: { sub: string; username: string }) {
    // const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    let refreshToken = null;

    if (req.cookies && 'rt' in req.cookies) refreshToken = req.cookies.rt;
    else refreshToken = req.get('authorization').replace('Bearer', '').trim();
    // else refreshToken = req.get('authorization')?.split(" ")[1];

    return { id: payload.sub, username: payload.username, refreshToken };
  }
}
