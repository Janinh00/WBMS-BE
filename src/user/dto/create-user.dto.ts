import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(4, 20, {
    message: 'Panjang username minimal 6 karakter dan maksimal 20 karakter.'
  })
  username: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() nik: string;

  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() division: string;
  @ApiProperty() @IsString() position: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() role: number;

  @ApiProperty()
  @IsString()
  @Length(8, 20, {
    message: 'Panjang password minimal 8 karakter dan maksimal 20 karakter.'
  })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20, {
    message: 'Panjang password confirm minimal 8 karakter dan maksimal 20 karakter.'
  })
  passwordConfirm: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isLDAPUser: boolean;
}
