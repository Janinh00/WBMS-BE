import { Module } from '@nestjs/common';
import { MillsController } from './mills.controller';
import { MillsService } from './mills.service';

@Module({
  controllers: [MillsController],
  providers: [MillsService],
})
export class MillsModule {}
