import { ApiProperty } from '@nestjs/swagger';
import { Site } from '@prisma/client';

export class SiteEntity implements Site {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() sourceSiteId: string;
  @ApiProperty() sourceSiteRefId: string;
  @ApiProperty() sourceSiteName: string;

  @ApiProperty() companyId: string;
  @ApiProperty() companyRefId: string;
  @ApiProperty() companyName: string;

  @ApiProperty() cityId: string;

  @ApiProperty() code: string;
  @ApiProperty() codeSap: string;
  @ApiProperty() name: string;
  @ApiProperty() shortName: string;
  @ApiProperty() description: string;

  @ApiProperty() latitude: number;
  @ApiProperty() longitude: number;
  @ApiProperty() solarCalibration: number;

  @ApiProperty() isMill: boolean;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
