import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCityDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() provinceId: string;

  @ApiProperty() @IsString() @IsNotEmpty() name: string;
}
