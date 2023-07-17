import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
}
