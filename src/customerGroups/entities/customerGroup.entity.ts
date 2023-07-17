import { ApiProperty } from '@nestjs/swagger';
import { CustomerGroup } from '@prisma/client';

export class CustomerGroupEntity implements CustomerGroup {
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
