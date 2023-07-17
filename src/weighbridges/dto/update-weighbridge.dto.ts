import { PartialType } from '@nestjs/swagger';
import { CreateWeighbridgeDto } from '.';

export class UpdateWeighbridgeDto extends PartialType(CreateWeighbridgeDto) {}
