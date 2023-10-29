import { Module } from '@nestjs/common';
import { BarcodeTypeController } from './barcode-type.controller';
import { BarcodeTypeService } from './barcode-type.service';

@Module({
  controllers: [BarcodeTypeController],
  providers: [BarcodeTypeService]
})
export class BarcodeTypeModule {}
