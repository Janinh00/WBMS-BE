import { PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}
