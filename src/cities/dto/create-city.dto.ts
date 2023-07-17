import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCityDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
