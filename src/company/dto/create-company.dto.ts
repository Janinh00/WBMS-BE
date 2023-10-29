import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty() @IsString() code: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codeSap: string;

  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shortName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address: string;
  @ApiPropertyOptional() @IsOptional() @IsString() addressExt: string;
  @ApiPropertyOptional() @IsOptional() @IsString() postalCode: string;
  @ApiPropertyOptional() @IsOptional() @IsString() country: string;
  @ApiPropertyOptional() @IsOptional() @IsString() province: string;
  @ApiPropertyOptional() @IsOptional() @IsString() city: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone: string;
  @ApiPropertyOptional() @IsOptional() @IsString() url: string;

  @ApiPropertyOptional() @IsOptional() @IsString() contactName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactEmail: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPhone: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isMillOperator: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isTransporter: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isSiteOperator: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isEstate: boolean;
}
