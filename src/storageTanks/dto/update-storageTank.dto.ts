import { PartialType } from '@nestjs/swagger';
import { CreateStorageTankDto } from '.';

export class UpdateStorageTankDto extends PartialType(CreateStorageTankDto) {}
