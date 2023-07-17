import { ApiProperty } from '@nestjs/swagger';
import { TransportVehicle } from '@prisma/client';

export class TransportVehicleEntity implements TransportVehicle {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() companyId: string;
  @ApiProperty() companyRefId: string;
  @ApiProperty() companyName: string;

  @ApiProperty() productId: string;
  @ApiProperty() productRefId: string;
  @ApiProperty() productName: string;
  @ApiProperty() productCode: string;

  @ApiProperty() plateNo: string;
  @ApiProperty() capacity: number;
  @ApiProperty() brand: string;
  @ApiProperty() model: string;
  @ApiProperty() sccModel: number;
  @ApiProperty() notes: string;

  @ApiProperty() licenseED: Date;
  @ApiProperty() keurED: Date;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
