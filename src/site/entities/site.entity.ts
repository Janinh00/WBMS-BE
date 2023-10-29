import { Site } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SiteEntity implements Site {
  @ApiPropertyOptional() id: string;

  @ApiPropertyOptional() refType: number;
  @ApiPropertyOptional() refId: string;

  @ApiPropertyOptional() sourceSiteId: string;
  @ApiPropertyOptional() sourceSiteRefId: string;
  @ApiPropertyOptional() sourceSiteName: string;

  @ApiPropertyOptional() companyId: string;
  @ApiPropertyOptional() companyRefId: string;
  @ApiProperty() companyName: string;

  @ApiPropertyOptional() cityId: string;

  @ApiProperty() code: string;
  @ApiPropertyOptional() codeSap: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() shortName: string;
  @ApiPropertyOptional() description: string;

  @ApiPropertyOptional() latitude: number;
  @ApiPropertyOptional() longitude: number;
  @ApiPropertyOptional() solarCalibration: number;

  @ApiPropertyOptional() isMill: boolean;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
