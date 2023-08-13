import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, JwtStrategy, RtStrategy } from './strategies';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy, AtStrategy]
})
export class AuthModule {}
