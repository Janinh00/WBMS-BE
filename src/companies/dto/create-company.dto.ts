import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() codeSap?: string;

  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() shortName?: string;
  @ApiProperty() @IsString() address?: string;
  @ApiProperty() @IsString() addressExt?: string;
  @ApiProperty() @IsString() postalCode?: string;
  @ApiProperty() @IsString() country?: string;
  @ApiProperty() @IsString() province?: string;
  @ApiProperty() @IsString() city?: string;
  @ApiProperty() @IsString() phone?: string;
  @ApiProperty() @IsString() url?: string;

  @ApiProperty() @IsString() contactName?: string;
  @ApiProperty() @IsString() contactEmail?: string;
  @ApiProperty() @IsString() contactPhone?: string;

  @ApiProperty() @IsBoolean() isMillOperator: boolean;
  @ApiProperty() @IsBoolean() isTransporter: boolean;
  @ApiProperty() @IsBoolean() isSiteOperator: boolean;
  @ApiProperty() @IsBoolean() isEstate: boolean;
}
