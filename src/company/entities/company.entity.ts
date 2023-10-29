import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Company } from '@prisma/client';

export class CompanyEntity implements Company {
  @ApiPropertyOptional() id: string;

  @ApiPropertyOptional() refType: number;
  @ApiPropertyOptional() refId: string;

  @ApiProperty() code: string;
  @ApiPropertyOptional() codeSap: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() shortName: string;
  @ApiPropertyOptional() address: string;
  @ApiPropertyOptional() addressExt: string;
  @ApiPropertyOptional() postalCode: string;
  @ApiPropertyOptional() country: string;
  @ApiPropertyOptional() province: string;
  @ApiPropertyOptional() city: string;
  @ApiPropertyOptional() phone: string;
  @ApiPropertyOptional() url: string;

  @ApiPropertyOptional() contactName: string;
  @ApiPropertyOptional() contactEmail: string;
  @ApiPropertyOptional() contactPhone: string;

  @ApiPropertyOptional() isMillOperator: boolean;
  @ApiPropertyOptional() isTransporter: boolean;
  @ApiPropertyOptional() isSiteOperator: boolean;
  @ApiPropertyOptional() isEstate: boolean;

  @ApiPropertyOptional() isDeleted: boolean;

  userCreated: string;
  userModified: string;
  dtCreated: Date;
  dtModified: Date;
}
