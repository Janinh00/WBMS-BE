import {
  Body,
  Get,
  Param,
  Post,
  Controller,
  Patch,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transactions.service';

@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('')
  getAll() {
    return this.transactionService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.transactionService.getById(id);
  }

  @Post('open-create-qrcode-semai')
  openCreateByQrcodeSemai(@Body() body: any) {
    return this.transactionService.openCreateByQrcodeSemai(body);
  }

  @Post('search-many')
  searchMany(@Body() query: any) {
    return this.transactionService.searchMany(query);
  }

  @Post('search-first')
  searchFirst(@Body() query: any) {
    return this.transactionService.searchFirst(query);
  }

  @Get('search-qr')
  searchByQR(@Body() query: any) {
    return this.transactionService.searchByQR(query);
  }

  @Get('getByPlateNo')
  getByPlateNo(@Query() query: any) {
    return this.transactionService.getByPlateNo(query);
  }

  @Post()
  create(@Body() dto: any) {
    return this.transactionService.create(dto);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.transactionService.updateById(id, dto);
  }
}
