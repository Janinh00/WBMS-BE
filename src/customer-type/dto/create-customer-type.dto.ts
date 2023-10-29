import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCustomerTypeDto {
  @ApiProperty() @IsString() name: string;

  @ApiPropertyOptional() @IsOptional() @IsString() shortDesc: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description: string;
}
