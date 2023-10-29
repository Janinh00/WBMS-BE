import { PartialType } from '@nestjs/swagger';
import { CreateCustomerGroupDto } from '.';

export class UpdateCustomerGroupDto extends PartialType(
  CreateCustomerGroupDto,
) {}
