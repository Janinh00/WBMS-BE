import { ApiProperty } from '@nestjs/swagger';
import { Mill } from '@prisma/client';

export class MillEntity implements Mill {
  @ApiProperty() id: string;

  @ApiProperty() siteId: string;
  @ApiProperty() companyId: string;

  @ApiProperty() code: string;
  @ApiProperty() name: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
