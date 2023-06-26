import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  hashedPassword: string;

  @ApiProperty()
  hashedRT: string | null;

  @ApiProperty()
  role: string;

  @ApiProperty()
  isEmailVerified: boolean;

  @ApiProperty()
  isLDAPUser: boolean;

  @ApiProperty()
  isDisabled: boolean;

  isDeleted: boolean;
  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
