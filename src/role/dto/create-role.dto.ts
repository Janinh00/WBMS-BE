import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;

  @ApiProperty() @IsInt() @IsNotEmpty() dashboard: number;
  @ApiProperty() @IsInt() @IsNotEmpty() pksTransaction: number;
  @ApiProperty() @IsInt() @IsNotEmpty() t30Transaction: number;
  @ApiProperty() @IsInt() @IsNotEmpty() labananTransaction: number;
  @ApiProperty() @IsInt() @IsNotEmpty() report: number;
  @ApiProperty() @IsInt() @IsNotEmpty() setting: number;
}
