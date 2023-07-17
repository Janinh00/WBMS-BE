import { ApiProperty } from '@nestjs/swagger';
import { Province } from '@prisma/client';

export class ProvinceEntity implements Province {
  @ApiProperty() id: string;

  @ApiProperty() name: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
