import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@prisma/client';

export class CompanyEntity implements Company {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() code: string;
  @ApiProperty() codeSap: string;
  @ApiProperty() name: string;
  @ApiProperty() shortName: string;
  @ApiProperty() address: string;
  @ApiProperty() addressExt: string;
  @ApiProperty() postalCode: string;
  @ApiProperty() country: string;
  @ApiProperty() province: string;
  @ApiProperty() city: string;
  @ApiProperty() phone: string;
  @ApiProperty() url: string;

  @ApiProperty() contactName: string;
  @ApiProperty() contactEmail: string;
  @ApiProperty() contactPhone: string;

  @ApiProperty() isMillOperator: boolean;
  @ApiProperty() isTransporter: boolean;
  @ApiProperty() isSiteOperator: boolean;
  @ApiProperty() isEstate: boolean;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
