import { Body, Get, Param, Post, Controller, Patch, Query, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransactionService } from './transactions.service';

@ApiTags('Transactions')
@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('')
  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.transactionService.getAll();

      dataOut.data.transaction.records = records;
      dataOut.data.transaction.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
    return;
  }

  @Get('deleted')
  async getAllDeleted() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.transactionService.getAllDeleted();

      dataOut.data.transaction.records = records;
      dataOut.data.transaction.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const record = await this.transactionService.getById(id);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Post('search-first')
  async searchFirst(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const record = await this.transactionService.searchFirst(query);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many')
  async searchMany(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.transactionService.searchMany(query);

      dataOut.data.transaction.records = records;
      dataOut.data.transaction.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-first-deleted')
  async searchFirstDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const record = await this.transactionService.searchFirstDeleted(query);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post('search-many-deleted')
  async searchManyDeleted(@Body() query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const records = await this.transactionService.searchManyDeleted(query);

      dataOut.data.transaction.records = records;
      dataOut.data.transaction.totalRecords = records.length;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: query, error };
    }

    return dataOut;
  }

  @Post()
  async create(@Body() dto: any, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.transactionService.create(dto, userId);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() dto: any, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.transactionService.updateById(id, dto, userId);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, reqBody: dto, error };
    }

    return dataOut;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: null
      },
      logs: {}
    };

    try {
      const userId = ''; //req.user['id'];
      const record = await this.transactionService.deleteById(id, userId);

      dataOut.data.transaction = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, param: id, error };
    }

    return dataOut;
  }

  @Get('search-qr')
  searchByQR(@Body() query: any) {
    return this.transactionService.searchByQR(query);
  }

  @Get('getByPlateNo')
  getByPlateNo(@Query() query: any) {
    return this.transactionService.getByPlateNo(query);
  }

  @Post('edispatch-find-create-qrcode')
  async eDispatchFindOrCreateByQrcode(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchFindOrCreateByQrcode(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbin-normal-after')
  async eDispatchPksWbInNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbInNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbout-normal-after')
  async eDispatchPksWbOutNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbOutNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbin-cancel-after')
  async eDispatchPksWbInCancelAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbInCancelAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbout-cancel-after')
  async eDispatchPksWbOutCancelAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbOutCancelAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbin-reject-t300-after')
  async eDispatchPksWbInRejectT300After(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbInRejectT300After(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbin-reject-bulking-after')
  async eDispatchPksWbInRejectBulkingAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbInRejectBulkingAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-pks-wbout-reject-after')
  async eDispatchPksWbOutRejectAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchPksWbOutRejectAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  // =========================================================

  @Post('edispatch-t30-wbin-normal-after')
  async eDispatchT30WbInNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchT30WbInNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-t30-wbout-normal-after')
  async eDispatchT30WbOutNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchT30WbOutNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-t30-wbin-cancel-after')
  async eDispatchT30WbInCancelAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchT30WbInCancelAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-t30-wbout-cancel-after')
  async eDispatchT30WbOutCancelAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchT30WbOutCancelAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  // =========================================================

  @Post('edispatch-bulking-wbin-normal-after')
  async eDispatchBulkingWbInNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchBulkingWbInNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-bulking-wbout-normal-after')
  async eDispatchBulkingWbOutNormalAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchBulkingWbOutNormalAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Post('edispatch-bulking-wbout-reject-after')
  async eDispatchBulkingWbOutRejectAfter(@Body() body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      const response = await this.transactionService.eDispatchBulkingWbOutRejectAfter(body);

      dataOut.data = { ...response };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }
}
