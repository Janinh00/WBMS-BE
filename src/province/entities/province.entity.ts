import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Province } from '@prisma/client';

export class ProvinceEntity implements Province {
  @ApiPropertyOptional() id: string;

  @ApiProperty() name: string;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
