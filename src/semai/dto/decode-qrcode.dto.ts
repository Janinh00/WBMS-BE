import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DecodeQrcodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
