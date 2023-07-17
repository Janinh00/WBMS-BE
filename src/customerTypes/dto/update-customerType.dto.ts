import { PartialType } from '@nestjs/swagger';
import { CreateCustomerTypeDto } from '.';

export class UpdateCustomerTypeDto extends PartialType(CreateCustomerTypeDto) {}
