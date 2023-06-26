import { Module } from '@nestjs/common';
import { BarcodeTypesController } from './barcodeTypes.controller';
import { BarcodeTypesService } from './barcodeTypes.service';

@Module({
  controllers: [BarcodeTypesController],
  providers: [BarcodeTypesService],
})
export class BarcodeTypesModule {}
