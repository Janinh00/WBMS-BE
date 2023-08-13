import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';

export class CityEntity implements City {
  @ApiProperty() id: string;

  @ApiProperty() provinceId: string;

  @ApiProperty() name: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
