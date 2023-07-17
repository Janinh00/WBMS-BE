import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
