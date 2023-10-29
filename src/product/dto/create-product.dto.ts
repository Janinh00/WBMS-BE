import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiPropertyOptional() @IsOptional() @IsString() productGroupName?: string;

  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codeSap: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() shortName: string;

  @ApiPropertyOptional() @IsOptional() @IsString() description: string;
  @ApiPropertyOptional() @IsOptional() @IsString() certification: string;
}
