import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsUUID()
  provinceId?: string;

  @ApiProperty()
  @IsString()
  provinceName?: string;

  @ApiProperty()
  @IsUUID()
  cityId?: string;

  @ApiProperty()
  @IsString()
  cityName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  shortName: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  addressExt?: string;

  @ApiProperty()
  @IsString()
  postalCode?: string;

  @ApiProperty()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsString()
  contactName?: string;

  @ApiProperty()
  @IsString()
  contactEmail?: string;

  @ApiProperty()
  @IsString()
  contactPhone?: string;

  @ApiProperty()
  @IsBoolean()
  isMillOperator: boolean;

  @ApiProperty()
  @IsBoolean()
  isTransporter: boolean;

  @ApiProperty()
  @IsBoolean()
  isSiteOperator: boolean;

  @ApiProperty()
  @IsBoolean()
  isEstate: boolean;
}
