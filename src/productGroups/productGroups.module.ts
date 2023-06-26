import { Module } from '@nestjs/common';
import { ProductGroupsController } from './productGroups.controller';
import { ProductGroupsService } from './productGroups.service';

@Module({
  controllers: [ProductGroupsController],
  providers: [ProductGroupsService],
})
export class ProductGroupsModule {}
