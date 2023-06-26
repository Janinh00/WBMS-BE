import { Module } from '@nestjs/common';
import { StorageTanksController } from './storageTanks.controller';
import { StorageTanksService } from './storageTanks.service';

@Module({
  controllers: [StorageTanksController],
  providers: [StorageTanksService],
})
export class StorageTanksModule {}
