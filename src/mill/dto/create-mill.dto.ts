import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsDecimal,
  IsInt,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateMillDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() siteId: string;
  @ApiProperty() @IsUUID() @IsNotEmpty() companyId: string;

  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
}
