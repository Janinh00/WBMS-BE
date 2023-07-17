import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateStorageTankDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() siteId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() siteRefId: string;
  @ApiProperty() @IsString() @IsNotEmpty() siteName: string;

  @ApiProperty() @IsUUID() @IsNotEmpty() stockOwnerId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() stockOwnerRefId: string;
  @ApiProperty() @IsString() @IsNotEmpty() stockOwnerName: string;

  @ApiProperty() @IsUUID() @IsNotEmpty() productId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() productRefId: string;
  @ApiProperty() @IsString() @IsNotEmpty() productName: string;

  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() shortName: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description: string;

  @ApiPropertyOptional() @IsNumber() @IsOptional() capacity: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() height: number;
  @ApiPropertyOptional() @IsInt() @IsOptional() sccModel: number;
}
