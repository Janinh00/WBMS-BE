import { PartialType } from '@nestjs/swagger';
import { DecodeQrcodeDto } from './decode-qrcode.dto';

export class UpdateSemaiDto extends PartialType(DecodeQrcodeDto) {}
