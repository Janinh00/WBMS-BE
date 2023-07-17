import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateSiteDto {
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() sourceSiteId?: string;
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() sourceSiteRefId?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() sourceSiteName?: string;

  @ApiProperty() @IsUUID() @IsNotEmpty() companyId?: string;
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() companyRefId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() companyName: string;

  @ApiProperty({ required: false }) @IsUUID() @IsOptional() cityId?: string;

  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() codeSap: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() shortName?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() description?: string;

  @ApiProperty({ required: false }) @IsNumber() @IsOptional() latitude?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() longitude?: number;
  @ApiProperty({ required: false }) @IsInt() @IsOptional() solarCalibration?: number;

  @ApiProperty({ required: false, default: false }) @IsBoolean() @IsOptional() isMill?: boolean = false;
}
