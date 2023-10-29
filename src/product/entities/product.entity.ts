import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiPropertyOptional() refId: string;

  @ApiPropertyOptional() productGroupName: string;

  @ApiProperty() code: string;
  @ApiPropertyOptional() codeSap: string;
  @ApiPropertyOptional() codeBatch: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() shortName: string;
  @ApiPropertyOptional() description: string;
  @ApiPropertyOptional() certification: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
