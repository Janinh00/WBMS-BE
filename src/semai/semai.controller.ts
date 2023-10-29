import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SemaiService } from './semai.service';
import { DecodeQrcodeDto, UpdateSemaiDto } from './dto';

@ApiTags('eDispatch')
@Controller('api/edispatch')
export class SemaiController {
  constructor(private readonly semaiService: SemaiService) {}
  @Post('encode-qrcode')
  async encodeQrcode(@Body() body: any) {
    let dataOut = {
      status: true,
      message: '',
      data: {
        qrcode: ''
      },
      logs: {}
    };

    try {
      const response = await this.semaiService.encodeQrcode(body);

      dataOut.data.qrcode = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  @Get('products')
  products() {
    return this.semaiService.products();
  }

  @Get('sites')
  sites() {
    return this.semaiService.sites();
  }

  @Get('storage-tanks')
  storageTanks() {
    return this.semaiService.storageTanks();
  }

  @Get('transport-vehicles')
  transportVehicles() {
    return this.semaiService.transportVehicles();
  }

  @Get('transporters')
  transporters() {
    return this.semaiService.transporters();
  }

  @Get('vehicle-operators')
  async vehicleOperators() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        vehicleOperator: {
          records: [],
          totalRecords: 0,
          page: 0
        }
      },
      logs: {}
    };

    try {
      const response = await this.semaiService.vehicleOperators();

      dataOut.data.vehicleOperator.records = response.records;
      dataOut.data.vehicleOperator.totalRecords = response.totalRecords;
      dataOut.data.vehicleOperator.page = response.records;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }
}
