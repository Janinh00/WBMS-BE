import { Module } from '@nestjs/common';
import { CustomerGroupsController } from './customerGroups.controller';
import { CustomerGroupsService } from './customerGroups.service';

@Module({
  controllers: [CustomerGroupsController],
  providers: [CustomerGroupsService],
})
export class CustomerGroupsModule {}
