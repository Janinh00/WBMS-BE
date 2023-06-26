import { ApiProperty } from '@nestjs/swagger';
import { Province } from '@prisma/client';

export class ProvinceEntity implements Province {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  userCreated: string;

  @ApiProperty()
  userModified: string;

  @ApiProperty()
  dtCreated: Date;

  @ApiProperty()
  dtModified: Date;
}
