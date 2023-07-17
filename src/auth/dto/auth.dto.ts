import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Length, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty() @IsString() @IsNotEmpty() username: string;
  @ApiProperty() @IsEmail() @IsNotEmpty() email: string;
  @ApiProperty() @IsString() @IsNotEmpty() nik: string;

  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() division: string;
  @ApiProperty() @IsString() @IsNotEmpty() position: string;
  @ApiPropertyOptional() @IsPhoneNumber() phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Panjang password minimal 8 karakter dan maksimal 20 karakter.'
  })
  password: string;
}

export class SigninDto {
  @ApiPropertyOptional() @IsString() @IsOptional() username: string;
  @ApiPropertyOptional() @IsEmail() @IsOptional() email: string;
  @ApiPropertyOptional() @IsString() @IsOptional() nik: string;

  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}
