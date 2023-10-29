import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCityDto {
  @ApiProperty() @IsUUID() provinceId: string;

  @ApiProperty() @IsString() name: string;
}
