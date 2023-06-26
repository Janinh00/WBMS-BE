import { Global, Module } from '@nestjs/common';
import { SemaiService } from './semai.service';
import { SemaiController } from './semai.controller';

@Global()
@Module({
  controllers: [SemaiController],
  providers: [SemaiService],
  exports: [SemaiService],
})
export class SemaiModule {}
