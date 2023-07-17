import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty() id: string;

  @ApiProperty() refType: number;
  @ApiProperty() refId: string;

  @ApiProperty() productGroupName: string;

  @ApiProperty() code: string;
  @ApiProperty() codeSap: string;
  @ApiProperty() name: string;
  @ApiProperty() shortName: string;
  @ApiProperty() description: string;
  @ApiProperty() certification: string;

  @ApiProperty() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
