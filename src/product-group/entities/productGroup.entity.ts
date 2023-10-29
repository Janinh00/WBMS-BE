import { ApiProperty } from '@nestjs/swagger';
import { ProductGroup } from '@prisma/client';

export class ProductGroupEntity implements ProductGroup {
  @ApiProperty() id: string;

  @ApiProperty() name: string;
  @ApiProperty() shortDesc: string;
  @ApiProperty() description: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
