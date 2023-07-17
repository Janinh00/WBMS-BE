import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty() @IsString() @IsNotEmpty() username: string;
  @ApiProperty() @IsEmail() @IsNotEmpty() email: string;
  @ApiProperty() @IsString() @IsNotEmpty() nik: string;

  @ApiProperty() @IsString() @IsNotEmpty() name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  division: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ required: false })
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Panjang password minimal 8 karakter dan maksimal 20 karakter.'
  })
  password: string;

  role?: string;
  isLDAPUser: boolean;
}
