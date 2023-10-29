import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductGroupDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;

  @ApiProperty({ required: false }) @IsString() @IsOptional() shortDesc?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() description?: string;
}
