import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserCreateEntity implements User {
  @ApiProperty() id: string;

  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() nik: string;

  @ApiProperty() name: string;
  @ApiProperty() division: string;
  @ApiProperty() position: string;
  @ApiPropertyOptional() phone: string;
  @ApiPropertyOptional() role: number;

  hashedPassword: string;
  hashedRT: string;

  @ApiPropertyOptional() isEmailVerified: boolean;
  @ApiPropertyOptional() isLDAPUser: boolean;
  @ApiPropertyOptional() isDisabled: boolean;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
