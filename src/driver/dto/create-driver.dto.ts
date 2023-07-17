import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsDecimal, IsInt, IsBoolean } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() companyId?: string;
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() companyRefId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() companyName: string;

  @ApiProperty() @IsString() @IsNotEmpty() nik: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() address?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() email?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() phone?: string;

  @ApiProperty({ required: false }) @IsString() @IsOptional() licenseNo?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() licenseED?: Date;
}
