import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { DbService } from 'src/db/db.service';
import { WBMS_JWT_KEY } from 'src/utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private db: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: WBMS_JWT_KEY
    });
  }

  async validate(payload: { sub: string; username: string }) {
    // ini seharusnya diawal aja, ditaro di payload,
    // karena kl seperti ini costnya tinggi setiap panggil api akan call db process
    // console.log(payload);
    const user = await this.db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      }
    });

    return user;
  }
}
