import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateTransportVehicleDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() companyId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() companyRefId: string;
  @ApiProperty() @IsString() companyName: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID() productId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() productRefId: string;
  @ApiProperty() @IsString() productName: string;

  @ApiProperty() @IsString() code: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codeSap: string;
  @ApiProperty() @IsString() plateNo: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() capacity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() brand: string;
  @ApiPropertyOptional() @IsOptional() @IsString() model: string;
  @ApiProperty() @IsInt() sccModel: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes: string;

  @ApiPropertyOptional() @IsOptional() licenseED: Date;
  @ApiPropertyOptional() @IsOptional() keurED: Date;
}
