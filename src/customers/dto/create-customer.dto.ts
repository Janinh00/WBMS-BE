import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty() @IsUUID() @IsNotEmpty() customerTypeId: string;
  @ApiProperty() @IsUUID() @IsNotEmpty() customerGroupId: string;
  @ApiProperty() @IsUUID() @IsNotEmpty() cityId: string;
  // @IsUUID() @ApiProperty() barcodeTypeId: string;

  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() codeSap: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() shortName: string;
  @ApiProperty() @IsString() address: string;
  @ApiProperty() @IsString() addressExt: string;
  @ApiProperty() @IsString() postalCode: string;
  @ApiProperty() @IsString() phone: string;
  @ApiProperty() @IsString() url: string;
  @ApiProperty() @IsString() contactName: string;
  @ApiProperty() @IsString() contactEmail: string;
  @ApiProperty() @IsString() contactPhone: string;
  @ApiProperty() @IsNumber() sortasi: number;
}
