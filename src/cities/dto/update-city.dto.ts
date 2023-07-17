import { PartialType } from '@nestjs/swagger';
import { CreateCityDto } from './';

export class UpdateCityDto extends PartialType(CreateCityDto) {}
