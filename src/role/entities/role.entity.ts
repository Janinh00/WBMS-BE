import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  @ApiProperty() id: string;

  @ApiProperty() name: string;

  @ApiProperty() dashboard: number;
  @ApiProperty() pksTransaction: number;
  @ApiProperty() t30Transaction: number;
  @ApiProperty() labananTransaction: number;
  @ApiProperty() report: number;
  @ApiProperty() setting: number;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
