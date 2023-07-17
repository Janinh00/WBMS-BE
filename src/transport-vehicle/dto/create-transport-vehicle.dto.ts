import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt, IsDate, IsDateString } from 'class-validator';

export class CreateTransportVehicleDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() companyId?: string;
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() companyRefId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() companyName: string;

  @ApiProperty() @IsUUID() @IsNotEmpty() productId: string;
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() productRefId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() productName: string;
  @ApiProperty() @IsString() @IsNotEmpty() productCode: string;

  @ApiProperty() @IsString() @IsNotEmpty() plateNo: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() capacity?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() brand?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() model?: string;
  @ApiProperty({ required: false }) @IsInt() @IsNotEmpty() sccModel: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() notes?: string;

  @ApiProperty({ required: false }) @IsString() @IsOptional() licenseED?: Date;
  @ApiProperty({ required: false }) @IsString() @IsOptional() keurED?: Date;
}
