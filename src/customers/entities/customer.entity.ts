import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  @ApiProperty() id: string;
  @ApiProperty() customerTypeId: string;
  @ApiProperty() customerGroupId: string;
  @ApiProperty() cityId: string;
  // @ApiProperty() barcodeTypeId: string;

  @ApiProperty() code: string;
  @ApiProperty() codeSap: string;
  @ApiProperty() name: string;
  @ApiProperty() shortName: string;
  @ApiProperty() address: string;
  @ApiProperty() addressExt: string;
  @ApiProperty() postalCode: string;
  @ApiProperty() phone: string;
  @ApiProperty() url: string;

  @ApiProperty() contactName: string;
  @ApiProperty() contactEmail: string;
  @ApiProperty() contactPhone: string;

  @ApiProperty() sortasi: number;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
