import { PartialType } from '@nestjs/swagger';
import { CreateMillDto } from '.';

export class UpdateMillDto extends PartialType(CreateMillDto) {}
