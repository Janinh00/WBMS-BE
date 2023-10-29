import { PartialType } from '@nestjs/swagger';
import { CreateProductGroupDto } from '.';

export class UpdateProductGroupDto extends PartialType(CreateProductGroupDto) {}
