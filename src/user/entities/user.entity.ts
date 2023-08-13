import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty() id: string;

  @ApiProperty() roleId: string | null;

  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() nik: string;

  @ApiProperty() name: string;
  @ApiProperty() division: string;
  @ApiProperty() position: string;
  @ApiProperty() phone: string | null;

  @ApiProperty() hashedPassword: string;
  @ApiProperty() hashedRT: string | null;

  @ApiProperty() isEmailVerified: boolean;
  @ApiProperty() isLDAPUser: boolean;
  @ApiProperty() isDisabled: boolean;

  @ApiProperty() isDeleted: boolean;

  userCreated: string | null;
  userModified: string | null;
  dtCreated: Date;
  dtModified: Date;
}
