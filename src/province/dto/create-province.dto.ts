import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty() @IsString() name: string;
}
