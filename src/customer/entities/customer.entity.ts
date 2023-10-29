import { Customer } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerEntity implements Customer {
  @ApiPropertyOptional() id: string;
  @ApiProperty() customerTypeId: string;
  @ApiProperty() customerGroupId: string;
  @ApiProperty() cityId: string;
  // @ApiProperty() barcodeTypeId: string;

  @ApiProperty() code: string;
  @ApiPropertyOptional() codeSap: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() shortName: string;
  @ApiPropertyOptional() address: string;
  @ApiPropertyOptional() addressExt: string;
  @ApiPropertyOptional() postalCode: string;
  @ApiPropertyOptional() phone: string;
  @ApiPropertyOptional() url: string;

  @ApiPropertyOptional() contactName: string;
  @ApiPropertyOptional() contactEmail: string;
  @ApiPropertyOptional() contactPhone: string;

  @ApiPropertyOptional() sortasi: number;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
