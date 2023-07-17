import { Module } from '@nestjs/common';
import { TransportVehicleService } from './transport-vehicle.service';
import { TransportVehicleController } from './transport-vehicle.controller';

@Module({
  controllers: [TransportVehicleController],
  providers: [TransportVehicleService]
})
export class TransportVehicleModule {}
