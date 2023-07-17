import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '@prisma/client';

export class DriverEntity implements Driver {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() companyId: string;
  @ApiProperty() companyRefId: string;
  @ApiProperty() companyName: string;

  @ApiProperty() nik: string;
  @ApiProperty() name: string;
  @ApiProperty() address: string;
  @ApiProperty() email: string;
  @ApiProperty() phone: string;

  @ApiProperty() licenseNo: string;
  @ApiProperty() licenseED: Date;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
