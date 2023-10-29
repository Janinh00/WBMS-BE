import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { City } from '@prisma/client';

export class CityEntity implements City {
  @ApiPropertyOptional() id: string;

  @ApiProperty() provinceId: string;

  @ApiProperty() name: string;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
