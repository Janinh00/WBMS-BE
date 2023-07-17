import { PartialType } from '@nestjs/swagger';
import { CreateTransportVehicleDto } from './create-transport-vehicle.dto';

export class UpdateTransportVehicleDto extends PartialType(CreateTransportVehicleDto) {}
