import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsBoolean, Length, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty() @IsString() @IsNotEmpty() username: string;
  @ApiProperty() @IsEmail() @IsNotEmpty() email: string;
  @ApiProperty() @IsString() @IsNotEmpty() nik: string;

  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() division: string;
  @ApiProperty() @IsString() @IsNotEmpty() position: string;
  // @ApiProperty({ required: false }) @IsPhoneNumber() phone: string;
  @ApiPropertyOptional() @IsString() phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Panjang password minimal 8 karakter dan maksimal 20 karakter.'
  })
  password: string;

  @ApiProperty() @IsBoolean() isLDAPUser: boolean;
}

export class SigninDto {
  @ApiPropertyOptional() @IsString() username: string;
  @ApiPropertyOptional() @IsEmail() email: string;
  @ApiPropertyOptional() @IsString() nik: string;

  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}
