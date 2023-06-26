import { AuthGuard } from '@nestjs/passport';

export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  // process audit trails bisa disini
  // process authorization bisa disini, connect ke database.
}
