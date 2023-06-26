import { Module } from '@nestjs/common';
import { CustomerTypesController } from './customerTypes.controller';
import { CustomerTypesService } from './customerTypes.service';

@Module({
  controllers: [CustomerTypesController],
  providers: [CustomerTypesService],
})
export class CustomerTypesModule {}
