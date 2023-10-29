import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransportVehicle } from '@prisma/client';

export class TransportVehicleEntity implements TransportVehicle {
  @ApiPropertyOptional() id: string;

  @ApiPropertyOptional() refType: number;
  @ApiPropertyOptional() refId: string;

  @ApiPropertyOptional() companyId: string;
  @ApiPropertyOptional() companyRefId: string;
  @ApiProperty() companyName: string;

  @ApiPropertyOptional() productId: string;
  @ApiPropertyOptional() productRefId: string;
  @ApiProperty() productName: string;

  @ApiProperty() code: string;
  @ApiPropertyOptional() codeSap: string;
  @ApiProperty() plateNo: string;
  @ApiPropertyOptional() description: string;
  @ApiPropertyOptional() capacity: number;
  @ApiPropertyOptional() brand: string;
  @ApiPropertyOptional() model: string;
  @ApiProperty() sccModel: number;
  @ApiPropertyOptional() notes: string;

  @ApiPropertyOptional() licenseED: Date;
  @ApiPropertyOptional() keurED: Date;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
