import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProvinceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
