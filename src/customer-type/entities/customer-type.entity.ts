import { CustomerType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerTypeEntity implements CustomerType {
  @ApiPropertyOptional() id: string;

  @ApiProperty() name: string;
  @ApiPropertyOptional() shortDesc: string;
  @ApiPropertyOptional() description: string;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
