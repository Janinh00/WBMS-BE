import { ApiProperty } from '@nestjs/swagger';
import { CustomerType } from '@prisma/client';

export class CustomerTypeEntity implements CustomerType {
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
