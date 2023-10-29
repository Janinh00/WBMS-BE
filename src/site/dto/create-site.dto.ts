import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateSiteDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() sourceSiteId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() sourceSiteRefId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sourceSiteName: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID() companyId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() companyRefId: string;
  @ApiProperty() @IsString() companyName: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID() cityId: string;

  @ApiProperty() @IsString() code: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codeSap: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shortName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber() latitude: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() longitude: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() solarCalibration: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isMill: boolean = false;
}
