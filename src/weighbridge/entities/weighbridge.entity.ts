import { ApiProperty } from '@nestjs/swagger';
import { Weighbridge } from '@prisma/client';

export class WeighbridgeEntity implements Weighbridge {
  @ApiProperty() id: string;

  @ApiProperty() siteId: string;

  @ApiProperty() code: string;
  @ApiProperty() name: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
