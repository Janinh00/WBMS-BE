import { PartialType } from '@nestjs/swagger';
import { CreateSiteDto } from '.';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {}
