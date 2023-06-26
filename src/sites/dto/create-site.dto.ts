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

export class CreateSiteDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  sourceSiteId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  sourceSiteRefId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  sourceSiteName?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  companyId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  companyRefId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  companyName: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  cityId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  shortName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  latitude?: number;

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  longitude?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  solarCalibration?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isMill?: boolean = false;
}
