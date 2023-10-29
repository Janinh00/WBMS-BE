import { Module } from '@nestjs/common';
import { WeighbridgesController } from './weighbridges.controller';
import { WeighbridgesService } from './weighbridges.service';

@Module({
  controllers: [WeighbridgesController],
  providers: [WeighbridgesService],
})
export class WeighbridgesModule {}
