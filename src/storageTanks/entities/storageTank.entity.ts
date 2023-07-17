import { ApiProperty } from '@nestjs/swagger';
import { StorageTank } from '@prisma/client';

export class StorageTankEntity implements StorageTank {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() siteId: string;
  @ApiProperty() siteRefId: string;
  @ApiProperty() siteName: string;

  @ApiProperty() stockOwnerId: string;
  @ApiProperty() stockOwnerRefId: string;
  @ApiProperty() stockOwnerName: string;

  @ApiProperty() productId: string;
  @ApiProperty() productRefId: string;
  @ApiProperty() productName: string;

  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() shortName: string;
  @ApiProperty() description: string;

  @ApiProperty() capacity: number;
  @ApiProperty() height: number;
  @ApiProperty() sccModel: number;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
