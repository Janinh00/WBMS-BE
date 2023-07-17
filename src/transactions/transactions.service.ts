import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';
import * as moment from 'moment';

import { SemaiService } from 'src/semai/semai.service';
import { ConfigsService } from 'src/configs/configs.service';

import { CreateTransactionDto } from './dto';

import { DraftTransactionDto } from './dto/draft-transaction.dto';
import { QrcodeDto } from 'src/semai/dto/qrcode.dt';

@Injectable()
export class TransactionService {
  constructor(
    private db: DbService,
    private config: ConfigService,
    private semaiAPI: SemaiService,
    private configWbms: ConfigsService
  ) {}

  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {}
    };

    try {
      const records = await this.db.transaction.findMany();

      dataOut.records = records;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchMany(query: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {}
    };

    try {
      const records = await this.db.transaction.findMany({
        ...query
      });

      dataOut.records = records;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchFirst(query: any) {
    const dataOut = {
      status: true,
      message: '',
      record: {},
      logs: {}
    };

    try {
      const record = await this.db.transaction.findFirst({
        ...query
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async openCreateByQrcodeSemai(body: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {},
        tType: '',
        urlPath: ''
      },
      logs: {}
    };

    const { content, tType } = body;

    try {
      const response = await this.semaiAPI.decodeQrcode({ content });

      if (!response.status) {
        dataOut.status = false;
        dataOut.message = response.message;
        dataOut.logs = response.logs;

        return dataOut;
      }

      const decodedQrcode = response.data.decodedQrcode as QrcodeDto;
      decodedQrcode.deliveryStatus = decodedQrcode.deliveryStatus || 0;

      const statusMapping = this.configWbms.TransactionValidation();
      const urlMapping = this.configWbms.WbTransactionUrlMapping();

      try {
        dataOut.data.tType = statusMapping[tType][decodedQrcode.vehicleOperationStatus][decodedQrcode.deliveryStatus];

        dataOut.data.urlPath = urlMapping[tType][decodedQrcode.vehicleOperationStatus][decodedQrcode.deliveryStatus];
      } catch (error) {
        throw new Error('Backend: Vehicle Operation Status atau Delivery Status tidak valid.');
      }

      const transaction: DraftTransactionDto = this.copyQrToTransaction(decodedQrcode, tType);

      const dtTransaction = await this.searchFirst({
        where: {
          transportVehiclePlateNo: transaction.transportVehiclePlateNo,
          progressStatus: { not: 15 },
          tType
        },
        orderBy: { bonTripNo: 'desc' }
      }).then((res) => res.record);

      // if (decodedQrcode.vehicleOperationStatus == 1) {
      //   if (decodedQrcode.deliveryStatus == 0) {
      //     if (dtTransaction)
      //       throw new Error('Error: vStatus atau dStatus tidak valid.');

      //     transaction = new DraftTransactionDto();

      //     transaction.tType = tType;
      //     transaction.bonTripNo = `P041${moment().format('YYMMDDHHmmss')}`; //moment().valueOf()
      //     transaction.progressStatus = 0;
      //   }

      //   if (decodedQrcode.deliveryStatus == 15) {
      //     if (!dtTransaction) {
      //       transaction = new DraftTransactionDto();

      //       transaction.tType = tType;
      //       transaction.bonTripNo = `P041${moment().format('YYMMDDHHmmss')}`; //moment().valueOf()
      //     } else transaction = dtTransaction as DraftTransactionDto;

      //     transaction.progressStatus = 10;
      //   }
      // }

      // if (!dtTransaction) {
      //   transaction = new DraftTransactionDto();

      //   transaction.tType = tType;
      //   transaction.bonTripNo = '';
      // } else transaction = dtTransaction as DraftTransactionDto;

      dataOut.data.transaction = transaction;

      console.log(dataOut.data);
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchByQR(query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    const { content, tType } = query;

    // console.log(query);
    // console.log(`${this.WBMS_SEMAI_API_URL}/sites`);

    try {
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async getByPlateNo(query: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    const { key, sort = 'asc' } = query;

    try {
      const record = await this.db.transaction.findFirst({
        where: { transportVehiclePlateNo: key },
        orderBy: { id: sort }
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async getById(id: string) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      const record = await this.db.transaction.findUnique({
        where: { id }
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async create(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      console.log('create new data:');
      console.log(dto);
      const record = await this.db.transaction.create({
        data: { ...dto, userCreated: '', userModified: '' }
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };

      throw error;
    }

    return dataOut;
  }

  async updateById(id: string, dto: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      const record = await this.db.transaction.update({
        where: { id },
        data: { ...dto, userModified: '' }
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };

      throw error;
    }

    return dataOut;
  }

  private copyQrToTransaction(dto: QrcodeDto, tType): DraftTransactionDto {
    const transaction = new DraftTransactionDto();

    transaction.tType = tType;

    transaction.bonTripNo = dto.externalRefNo;
    transaction.vehicleStatus = dto.vehicleOperationStatus;
    transaction.deliveryStatus = dto.deliveryStatus || 0;
    transaction.progressStatus = 0;

    transaction.deliveryOrderId = dto?.deliveryOrderId;
    transaction.deliveryOrderNo = dto?.deliveryOrderNo;
    transaction.deliveryDate = dto.deliveryDate ? moment(dto?.deliveryDate).toDate() : null;

    transaction.transporterCompanyCode = dto.transporterCompanyCode;
    transaction.transporterCompanyName = dto.transporterCompanyFullName;

    transaction.driverNik = dto.driverCitizenNo;
    transaction.driverName = dto.driverFullName;
    transaction.driverLicenseNo = dto.drivingLicenceNo;

    transaction.transportVehiclePlateNo = dto.vehiclePlateNo;
    transaction.transportVehicleProductCode = dto.vehicleProductCode;
    transaction.transportVehicleProductName = dto.vehicleProductName;
    transaction.transportVehicleSccModel = dto.vehicleAllowableSccModel;

    transaction.originWeighInKg = dto.originWeighInKg || 0;
    transaction.originWeighInRemark = dto.originWeighInRemark;
    transaction.originWeighInOperatorName = dto.originWeighInOperatorName;
    transaction.originWeighInTimestamp = dto.originWeighInTimestamp
      ? moment(dto.originWeighInTimestamp).toDate()
      : null;

    transaction.originWeighOutKg = dto.originWeighOutKg || 0;
    transaction.originWeighOutRemark = dto.originWeighOutRemark;
    transaction.originWeighOutOperatorName = dto.originWeighOutOperatorName;
    transaction.originWeighOutTimestamp = dto.originWeighOutTimestamp
      ? moment(dto.originWeighOutTimestamp).toDate()
      : null;

    transaction.potonganWajib = 0;
    transaction.potonganLain = 0;

    transaction.returnWeighInKg = dto.returnWeighInKg || 0;
    transaction.returnWeighInRemark = dto.returnWeighInRemark;
    transaction.returnWeighInOperatorName = dto.returnWeighInOperatorName;
    transaction.returnWeighInTimestamp = dto.returnWeighInTimestamp
      ? moment(dto.returnWeighInTimestamp).toDate()
      : null;

    transaction.returnWeighOutKg = dto.returnWeighOutKg || 0;
    transaction.returnWeighOutRemark = dto.returnWeighOutRemark;
    transaction.returnWeighOutOperatorName = dto.returnWeighOutOperatorName;
    transaction.returnWeighOutTimestamp = dto.returnWeighOutTimestamp
      ? moment(dto.returnWeighOutTimestamp).toDate()
      : null;

    transaction.currentSeal1 = dto.currentSeal1;
    transaction.currentSeal2 = dto.currentSeal2;
    transaction.currentSeal3 = dto.currentSeal3;
    transaction.currentSeal4 = dto.currentSeal4;

    transaction.jsonData = dto;

    return transaction;
  }
}
