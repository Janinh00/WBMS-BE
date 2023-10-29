import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { DbService } from 'src/db/db.service';
import { SemaiService } from 'src/semai/semai.service';
import { CreateTransactionDto, DraftTransactionDto } from './dto';
import { QrcodeDto } from 'src/semai/dto/qrcode.dto';

import { Configs, edispatchUrlMapping } from '../utils/constants';

@Injectable()
export class TransactionService {
  constructor(
    private db: DbService,
    private semaiAPI: SemaiService
  ) {}

  async getAll() {
    const records = await this.db.transaction.findMany({
      where: { isDeleted: false }
    });

    return records;
  }

  async getAllDeleted() {
    const records = await this.db.transaction.findMany({
      where: { isDeleted: true }
    });

    return records;
  }

  async getById(id: string) {
    const record = await this.db.transaction.findUnique({
      where: { id }
    });

    return record;
  }

  async searchFirst(query: any) {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.transaction.findFirst(query);

    return record;
  }

  async searchMany(query: any) {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.transaction.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any) {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.transaction.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any) {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.transaction.findMany(query);

    return records;
  }

  async create(dto: any, userId: string) {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId
      }
    };

    const record = await this.db.transaction.create(params);

    return record;
  }

  async updateById(id: string, dto: any, userId: string) {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId }
    };

    const record = await this.db.transaction.update(params);

    return record;
  }

  async deleteById(id: string, userId: string) {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId }
    };

    const record = await this.db.transaction.update(params);

    return record;
  }

  // ===================================================

  async searchByQR(query: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    const { content, tType } = query;

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

  async eDispatchFindOrCreateByQrcode(body: any) {
    let dataOut = {
      draftTransaction: null,
      urlPath: ''
    };

    const { content, typeSite } = body;
    // console.log('eDispatchFindOrCreate', body);

    const response = await this.semaiAPI.decodeQrcode({ content });

    // console.log('response:', response);

    const decodedQrcode = response.record as QrcodeDto;
    decodedQrcode.deliveryStatus = decodedQrcode.deliveryStatus || 0;

    console.log('vStatus:', decodedQrcode.vehicleOperationStatus);
    console.log('dStatus:', decodedQrcode.deliveryStatus);
    console.log('decodedQrcode:', decodedQrcode);

    try {
      // dataOut.urlPath =
      //   edispatchUrlMapping[typeSite][decodedQrcode.vehicleOperationStatus][decodedQrcode.deliveryStatus];

      const results =
        await this.edispatchFunctionMapping[typeSite][decodedQrcode.vehicleOperationStatus][
          decodedQrcode.deliveryStatus
        ](decodedQrcode);

      dataOut = { ...results };
    } catch (error) {
      throw new Error('Backend: Vehicle Operation Status atau Delivery Status tidak valid.');
      return;
    }

    return dataOut;
  }

  // ===================================================

  async eDispatchPksWbInNormalBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-pks/normal-in',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 1,
        progressStatus: 1 // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan baru masuk, seharusnya belum ada data gantung di DB
    if (record) {
      throw new Error(`Kendaraan dengan no polisi: ${decodedQrcode?.vehiclePlateNo} sudah terdapat didalam transaksi.`);
    }

    // karena vehicle menentukan productnya yang mana
    decodedQrcode.productCode = decodedQrcode.vehicleProductCode;
    decodedQrcode.productName = decodedQrcode.vehicleProductName;

    const draftTransaction: DraftTransactionDto = this.eDispatchCopyQrcodeToTransaction(decodedQrcode, 1);
    const bonTripNo = `${Configs.SITE_CODE}${Configs.BONTRIP_SUFFIX}${moment().format('YYMMDDHHmmss')}`; //moment().valueOf()

    draftTransaction.bonTripNo = bonTripNo;
    draftTransaction.progressStatus = 0;

    dataOut.draftTransaction = { ...draftTransaction };

    return dataOut;
  }

  async eDispatchPksWbInNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.initiateDelivery({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 1;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.create(wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat membuat transaksi baru.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchPksWbOutNormalBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-pks/normal-out',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 1,
        progressStatus: 1 // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan sudah didalam, seharusnya sudah ada data gantung di DB
    if (!record) {
      throw new Error(
        `Kendaraan dengan no polisi: ${decodedQrcode?.transportVehiclePlateNo} tidak terdapat didalam transaksi.`
      );
    }

    // const draftTransaction: DraftTransactionDto = this.eDispatchCopyQrcodeToTransaction(decodedQrcode, 3);
    // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
    // harus ditambahkan field lain yang mungkin ke update
    // record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
    // record.deliveryStatus = decodedQrcode.deliveryStatus;
    record.jsonData = { ...decodedQrcode }; //jsonData diupdate
    record.progressStatus = 2;

    dataOut.draftTransaction = { ...this.UpdateEDispatchToWBMS(record) };

    return dataOut;
  }

  async eDispatchPksWbOutNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.dispatchDelivery({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 4;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  // ===================================================

  async eDispatchPksWbInOutCancelBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-pks',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 1,
        // cari yang statusnya loading/unloading, data dispatched, n cancel unloading,
        progressStatus: { in: [1, 4, 6] }
      },
      orderBy: { bonTripNo: 'desc' }
    });
    // TODO: (case: check apakah pks asalnya sesuai)

    // Kendaraan baru masuk, seharusnya belum ada data gantung di DB
    if (!record) {
      throw new Error(`Kendaraan dengan no polisi: ${decodedQrcode?.vehiclePlateNo} tidak terdapat didalam transaksi.`);
    }

    if (record.progressStatus === 1 || record.progressStatus === 4) {
      // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
      // harus ditambahkan field lain yang mungkin ke update
      record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
      record.deliveryStatus = decodedQrcode.deliveryStatus;
      record.jsonData = { ...decodedQrcode }; //jsonData diupdate
      record.progressStatus = 5;

      dataOut.urlPath = '/wb/transaction-pks/cancel-in';
    } else if (record.progressStatus === 6) {
      record.progressStatus = 7;

      dataOut.urlPath = '/wb/transaction-pks/cancel-out';
    }

    dataOut.draftTransaction = { ...record };

    return dataOut;
  }

  async eDispatchPksWbInCancelAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    const { wbTransaction } = body;

    wbTransaction.progressStatus = 6;

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;
    dataOut.transaction = { ...dataOut.transaction };

    return dataOut;
  }

  async eDispatchPksWbOutCancelAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);
    // tempTrans = SemaiUtils.CopyWBToSemai(tempTrans);
    // tempTrans = SemaiUtils.CopyWBRToSemai(tempTrans);

    const response = await this.semaiAPI.closeDeliveryCanceled({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 9;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  // ===================================================

  async eDispatchPksWbInOutRejectBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-pks',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 1,
        // cari yang statusnya data dispatched
        progressStatus: { in: [4, 11] }
      },
      orderBy: { bonTripNo: 'desc' }
    });
    // TODO: (case: check apakah pks asalnya sesuai)

    // Kendaraan baru masuk, reject dari bulking
    if (!record) {
      const draftTransaction: DraftTransactionDto = this.eDispatchCopyQrcodeToTransaction(decodedQrcode, 1);
      draftTransaction.progressStatus = 10;

      dataOut.draftTransaction = { ...draftTransaction };
      dataOut.urlPath = '/wb/transaction-pks/reject-in-bulking';

      return dataOut;
    }

    if (record.progressStatus === 4) {
      // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
      // harus ditambahkan field lain yang mungkin ke update
      record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
      record.deliveryStatus = decodedQrcode.deliveryStatus;
      record.jsonData = { ...decodedQrcode }; //jsonData diupdate
      record.progressStatus = 10;

      dataOut.urlPath = '/wb/transaction-pks/reject-in-t300';
    } else if (record.progressStatus === 11) {
      record.progressStatus = 12;

      dataOut.urlPath = '/wb/transaction-pks/reject-out';
    }

    dataOut.draftTransaction = { ...record };

    return dataOut;
  }

  async eDispatchPksWbInRejectT300After(body: any) {
    const dataOut = {
      transaction: {}
    };

    const { wbTransaction } = body;

    wbTransaction.progressStatus = 11;

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;
    dataOut.transaction = { ...dataOut.transaction };

    return dataOut;
  }

  async eDispatchPksWbInRejectBulkingAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    const { wbTransaction } = body;

    wbTransaction.progressStatus = 11;

    // ini diperlukan tiap transaksi atau gak?
    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const record = await this.create(wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat membuat transaksi baru.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchPksWbOutRejectAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);
    // tempTrans = SemaiUtils.CopyWBToSemai(tempTrans);
    // tempTrans = SemaiUtils.CopyWBRToSemai(tempTrans);

    console.log('masuk sini', wbTransaction);

    const response = await this.semaiAPI.closeDeliveryRejected({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 14;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  // ===================================================

  async eDispatchT30WbInNormalBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-t30/normal-in',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 2,
        progressStatus: 1 // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan baru masuk, seharusnya belum ada data gantung di DB
    if (record) {
      throw new Error(`Kendaraan dengan no polisi: ${decodedQrcode?.vehiclePlateNo} sudah terdapat didalam transaksi.`);
    }

    // karena vehicle menentukan productnya yang mana
    decodedQrcode.productCode = decodedQrcode.vehicleProductCode;
    decodedQrcode.productName = decodedQrcode.vehicleProductName;

    const draftTransaction: DraftTransactionDto = this.eDispatchCopyQrcodeToTransaction(decodedQrcode, 2);
    const bonTripNo = `${Configs.SITE_CODE}${Configs.BONTRIP_SUFFIX}${moment().format('YYMMDDHHmmss')}`; //moment().valueOf()

    draftTransaction.bonTripNo = bonTripNo;
    draftTransaction.progressStatus = 0;

    dataOut.draftTransaction = { ...draftTransaction };

    return dataOut;
  }

  async eDispatchT30WbInNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.initiateDelivery({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 1;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.create(wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat membuat transaksi baru.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchT30WbOutNormalCancelBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-t30',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 2,
        progressStatus: { in: [1, 6] } // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan sudah didalam, seharusnya sudah ada data gantung di DB
    if (!record) {
      throw new Error(
        `Kendaraan dengan no polisi: ${decodedQrcode?.transportVehiclePlateNo} tidak terdapat didalam transaksi.`
      );
    }

    if (record.progressStatus === 1) {
      // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
      // harus ditambahkan field lain yang mungkin ke update
      record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
      record.deliveryStatus = decodedQrcode.deliveryStatus;
      record.jsonData = { ...decodedQrcode }; //jsonData diupdate
      record.progressStatus = 2;

      dataOut.urlPath = '/wb/transaction-t30/normal-out';
    } else if (record.progressStatus === 6) {
      record.progressStatus = 7;

      dataOut.urlPath = '/wb/transaction-t30/cancel-out';
    }

    dataOut.draftTransaction = { ...record };

    return dataOut;
  }

  async eDispatchT30WbOutNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.dispatchDelivery({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 4;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  // ===================================================

  async eDispatchT30WbInCancelAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    const { wbTransaction } = body;

    wbTransaction.progressStatus = 6;

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;
    dataOut.transaction = { ...dataOut.transaction };

    return dataOut;
  }

  async eDispatchT30WbOutCancelAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.closeDeliveryCanceled({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 9;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchT30WbInOutCancelBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-t30',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        OR: [{ transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo }, { bonTripNo: decodedQrcode?.externalRefNo }],
        typeSite: 2,
        // cari yang statusnya loading/unloading, data dispatched, n cancel unloading,
        progressStatus: { in: [4, 6] }
      },
      orderBy: { bonTripNo: 'desc' }
    });
    // TODO: (case: check apakah pks asalnya sesuai)

    // Kendaraan cancel, seharusnya sudah masuk dalam DB
    if (!record) {
      throw new Error(`Kendaraan dengan no polisi: ${decodedQrcode?.vehiclePlateNo} tidak terdapat didalam transaksi.`);
    }

    if (record.progressStatus === 4) {
      // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
      // harus ditambahkan field lain yang mungkin ke update
      record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
      record.deliveryStatus = decodedQrcode.deliveryStatus;
      record.jsonData = { ...decodedQrcode }; //jsonData diupdate
      record.progressStatus = 5;

      dataOut.urlPath = '/wb/transaction-t30/cancel-in';
    } else if (record.progressStatus === 6) {
      record.progressStatus = 7;

      dataOut.urlPath = '/wb/transaction-t30/cancel-out';
    }

    dataOut.draftTransaction = { ...record };

    return dataOut;
  }

  // ===================================================

  async eDispatchBulkingWbInNormalBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-bulking/normal-in',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 3,
        progressStatus: 1 // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan baru masuk, seharusnya belum ada data gantung di DB
    if (record) {
      throw new Error(`Kendaraan dengan no polisi: ${decodedQrcode?.vehiclePlateNo} sudah terdapat didalam transaksi.`);
    }

    // karena vehicle menentukan productnya yang mana
    decodedQrcode.productCode = decodedQrcode.vehicleProductCode;
    decodedQrcode.productName = decodedQrcode.vehicleProductName;

    const draftTransaction: DraftTransactionDto = this.eDispatchCopyQrcodeToTransaction(decodedQrcode, 3);
    const bonTripNo = `${Configs.SITE_CODE}${Configs.BONTRIP_SUFFIX}${moment().format('YYMMDDHHmmss')}`; //moment().valueOf()

    draftTransaction.bonTripNo = bonTripNo;
    draftTransaction.progressStatus = 0;

    dataOut.draftTransaction = { ...draftTransaction };

    return dataOut;
  }

  async eDispatchBulkingWbInNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    console.log('data initiate uloading', wbTransaction.jsonData);
    const response = await this.semaiAPI.initiateUnloading({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 1;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.create(wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat membuat transaksi baru.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchBulkingWbOutNormalRejectBefore(DecodedQrcode) {
    const decodedQrcode = { ...DecodedQrcode };

    const dataOut = {
      urlPath: '/wb/transaction-bulking/normal-out',
      draftTransaction: {}
    };

    const record = await this.searchFirst({
      where: {
        transportVehiclePlateNo: decodedQrcode?.vehiclePlateNo,
        typeSite: 3,
        progressStatus: 1 // cari yang statusnya unloading
      },
      orderBy: { bonTripNo: 'desc' }
    });

    // Kendaraan sudah didalam, seharusnya sudah ada data gantung di DB
    if (!record) {
      throw new Error(
        `Kendaraan dengan no polisi: ${decodedQrcode?.transportVehiclePlateNo} tidak terdapat didalam transaksi.`
      );
    }

    // Secara pemahaman jsonData dalam mobile app edispatch terupdate (berubah)
    // harus ditambahkan field lain yang mungkin ke update
    record.vehicleStatus = decodedQrcode.vehicleOperationStatus;
    record.deliveryStatus = decodedQrcode.deliveryStatus;
    record.jsonData = { ...decodedQrcode }; //jsonData diupdate
    record.progressStatus = 2;

    dataOut.draftTransaction = { ...record };

    return dataOut;
  }

  async eDispatchBulkingWbOutNormalAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.closeDeliveryAccepted({
      ...wbTransaction.jsonData
    });

    console.log('response from closeDeliveryAccepted:', response);

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 4;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }

  async eDispatchBulkingWbOutRejectAfter(body: any) {
    const dataOut = {
      transaction: {}
    };

    let { wbTransaction } = body;

    wbTransaction.jsonData = this.UpdateWBToEDispatch(wbTransaction);

    const response = await this.semaiAPI.rejectDelivery({
      ...wbTransaction.jsonData
    });

    wbTransaction.jsonData = { ...response.record };
    wbTransaction.progressStatus = 14;
    wbTransaction = this.UpdateEDispatchToWBMS(wbTransaction);

    const record = await this.updateById(wbTransaction.id, wbTransaction, '');

    if (!record) {
      throw new Error('Database: tidak dapat update transaksi.');
    }

    dataOut.transaction = record;

    return dataOut;
  }
  // ===================================================

  eDispatchCopyQrcodeToTransaction(dto: QrcodeDto, typeSite): DraftTransactionDto {
    const draftTransaction = new DraftTransactionDto();

    draftTransaction.typeSite = typeSite;
    draftTransaction.typeTransaction = 1;

    draftTransaction.bonTripNo = dto.externalRefNo;
    draftTransaction.vehicleStatus = dto.vehicleOperationStatus;
    draftTransaction.deliveryStatus = dto.deliveryStatus || 0;
    draftTransaction.progressStatus = 0;

    draftTransaction.deliveryOrderId = dto?.deliveryOrderId;
    draftTransaction.deliveryOrderNo = dto?.deliveryOrderNo;
    draftTransaction.deliveryDate = dto.deliveryDate ? moment(dto?.deliveryDate).toDate() : null;

    // draftTransaction.productId  => tidak ada di jsonData
    draftTransaction.productCode = dto.productCode;
    draftTransaction.productName = dto.productName;

    draftTransaction.rspoCertificateNumber = dto.rspoCertificateNumber;
    draftTransaction.rspoSccModel = dto.rspoSccModel;
    draftTransaction.rspoUniqueNumber = dto.rspoUniqueNumber;

    draftTransaction.isccCertificateNumber = dto.isccCertificateNumber;
    draftTransaction.isccSccModel = dto.isccSccModel;
    draftTransaction.isccUniqueNumber = dto.isccUniqueNumber;
    draftTransaction.isccGhgValue = dto.isccGhgValue;
    draftTransaction.isccEeeValue = dto.isccEeeValue;

    draftTransaction.ispoCertificateNumber = dto.ispoCertificateNumber;
    draftTransaction.ispoSccModel = dto.ispoSccModel;
    draftTransaction.ispoUniqueNumber = dto.ispoUniqueNumber;

    // draftTransaction.transporterCompanyId => tidak ada di jsonData
    draftTransaction.transporterCompanyCode = dto.transporterCompanyCode;
    draftTransaction.transporterCompanyName = dto.transporterCompanyFullName;
    draftTransaction.transporterCompanyShortName = dto.transporterCompanyShortName;

    // draftTransaction.driverId => tidak ada di jsonData
    draftTransaction.driverNik = dto.driverCitizenNo;
    draftTransaction.driverName = dto.driverFullName;
    draftTransaction.driverLicenseNo = dto.drivingLicenceNo;

    // draftTransaction.transportVehicleId => tidak ada di jsonData
    draftTransaction.transportVehiclePlateNo = dto.vehiclePlateNo;
    draftTransaction.transportVehicleProductCode = dto.vehicleProductCode;
    draftTransaction.transportVehicleProductName = dto.vehicleProductName;
    draftTransaction.transportVehicleSccModel = dto.vehicleAllowableSccModel;

    // draftTransaction.originSiteId => tidak ada di jsonData
    draftTransaction.originSiteCode = dto.originSiteCode;
    draftTransaction.originSiteName = dto.originSiteName;

    // draftTransaction.originSourceStorageTankId => tidak ada di jsonData
    draftTransaction.originSourceStorageTankCode = dto.originSourceTankCode;
    draftTransaction.originSourceStorageTankName = dto.originSourceTankCode;

    // draftTransaction.destinationSiteId => tidak ada di jsonData
    draftTransaction.destinationSiteCode = dto.destinationSiteCode;
    draftTransaction.destinationSiteName = dto.destinationSiteName;

    // draftTransaction.destinationSinkStorageTankId => tidak ada di jsonData
    draftTransaction.destinationSinkStorageTankCode = dto.destinationSinkTankCode;
    draftTransaction.destinationSinkStorageTankName = dto.destinationSinkTankName;

    draftTransaction.originFfaPercentage = dto.originFfaPercentage;
    draftTransaction.originMoistPercentage = dto.originMoistPercentage;
    draftTransaction.originDirtPercentage = dto.originDirtPercentage;

    draftTransaction.originWeighInKg = dto.originWeighInKg || 0;
    draftTransaction.originWeighInRemark = dto.originWeighInRemark;
    draftTransaction.originWeighInOperatorName = dto.originWeighInOperatorName;
    draftTransaction.originWeighInTimestamp = dto.originWeighInTimestamp
      ? moment(dto.originWeighInTimestamp).toDate()
      : null;

    draftTransaction.originWeighOutKg = dto.originWeighOutKg || 0;
    draftTransaction.originWeighOutRemark = dto.originWeighOutRemark;
    draftTransaction.originWeighOutOperatorName = dto.originWeighOutOperatorName;
    draftTransaction.originWeighOutTimestamp = dto.originWeighOutTimestamp
      ? moment(dto.originWeighOutTimestamp).toDate()
      : null;

    draftTransaction.potonganWajib = 0;
    draftTransaction.potonganLain = 0;

    draftTransaction.destinationWeighInKg = dto.destinationWeighInKg || 0;
    draftTransaction.destinationWeighInRemark = dto.destinationWeighInRemark;
    draftTransaction.destinationWeighInOperatorName = dto.destinationWeighInOperatorName;
    draftTransaction.destinationWeighInTimestamp = dto.destinationWeighInTimestamp
      ? moment(dto.destinationWeighInTimestamp).toDate()
      : null;

    draftTransaction.destinationWeighOutKg = dto.destinationWeighOutKg || 0;
    draftTransaction.destinationWeighOutRemark = dto.destinationWeighOutRemark;
    draftTransaction.destinationWeighOutOperatorName = dto.destinationWeighOutOperatorName;
    draftTransaction.destinationWeighOutTimestamp = dto.destinationWeighOutTimestamp
      ? moment(dto.destinationWeighOutTimestamp).toDate()
      : null;

    draftTransaction.returnWeighInKg = dto.returnWeighInKg || 0;
    draftTransaction.returnWeighInRemark = dto.returnWeighInRemark;
    draftTransaction.returnWeighInOperatorName = dto.returnWeighInOperatorName;
    draftTransaction.returnWeighInTimestamp = dto.returnWeighInTimestamp
      ? moment(dto.returnWeighInTimestamp).toDate()
      : null;

    draftTransaction.returnWeighOutKg = dto.returnWeighOutKg || 0;
    draftTransaction.returnWeighOutRemark = dto.returnWeighOutRemark;
    draftTransaction.returnWeighOutOperatorName = dto.returnWeighOutOperatorName;
    draftTransaction.returnWeighOutTimestamp = dto.returnWeighOutTimestamp
      ? moment(dto.returnWeighOutTimestamp).toDate()
      : null;

    draftTransaction.currentSeal1 = dto.currentSeal1;
    draftTransaction.currentSeal2 = dto.currentSeal2;
    draftTransaction.currentSeal3 = dto.currentSeal3;
    draftTransaction.currentSeal4 = dto.currentSeal4;

    draftTransaction.loadedSeal1 = dto.loadedSeal1;
    draftTransaction.loadedSeal2 = dto.loadedSeal2;
    draftTransaction.loadedSeal3 = dto.loadedSeal3;
    draftTransaction.loadedSeal4 = dto.loadedSeal4;
    draftTransaction.loadingRemark = dto.loadingRemark;
    draftTransaction.loadingOperatorName = dto.loadingOperatorName;
    draftTransaction.loadingTimestamp = dto.loadingTimestamp ? moment(dto.loadingTimestamp).toDate() : null;

    draftTransaction.unloadedSeal1 = dto.unloadedSeal1;
    draftTransaction.unloadedSeal2 = dto.unloadedSeal2;
    draftTransaction.unloadedSeal3 = dto.unloadedSeal3;
    draftTransaction.unloadedSeal4 = dto.unloadedSeal4;
    draftTransaction.unloadingRemark = dto.unloadingRemark;
    draftTransaction.unloadingOperatorName = dto.unloadingOperatorName;
    draftTransaction.unloadingTimestamp = dto.unloadingTimestamp ? moment(dto.unloadingTimestamp).toDate() : null;

    draftTransaction.returnUnloadedSeal1 = dto.returnUnloadedSeal1;
    draftTransaction.returnUnloadedSeal2 = dto.returnUnloadedSeal2;
    draftTransaction.returnUnloadedSeal3 = dto.returnUnloadedSeal3;
    draftTransaction.returnUnloadedSeal4 = dto.returnUnloadedSeal4;
    draftTransaction.returnUnloadingRemark = dto.returnUnloadingRemark;
    draftTransaction.returnUnloadingOperatorName = dto.returnUnloadingOperatorName;
    draftTransaction.returnUnloadingTimestamp = dto.returnUnloadingTimestamp
      ? moment(dto.returnUnloadingTimestamp).toDate()
      : null;

    draftTransaction.jsonData = dto;

    return draftTransaction;
  }

  UpdateWBToEDispatch = (wbTransaction) => {
    const jsonData = { ...wbTransaction.jsonData, externalRefNo: wbTransaction.bonTripNo };

    if (wbTransaction.rspoSccMode) jsonData.rspoSccModel = wbTransaction.rspoSccModel;
    if (wbTransaction.isccSccModel) jsonData.isccSccModel = wbTransaction.isccSccModel;

    if (wbTransaction.originSourceStorageTankId) {
      jsonData.originSourceTankCode = wbTransaction.originSourceStorageTankCode;
      jsonData.originSourceTankName = wbTransaction.originSourceStorageTankName;
    }

    if (wbTransaction.destinationSinkStorageTankId) {
      jsonData.destinationSinkTankCode = wbTransaction.destinationSinkStorageTankCode;
      jsonData.destinationSinkTankName = wbTransaction.destinationSinkStorageTankName;
    }

    if (wbTransaction.originWeighInKg > 0) {
      jsonData.originWeighInKg = wbTransaction.originWeighInKg;
      jsonData.originWeighInOperatorName = wbTransaction.originWeighInOperatorName;
      jsonData.originWeighInTimestamp = this.ConvertDateStr(wbTransaction.originWeighInTimestamp);
    }

    if (wbTransaction.originWeighOutKg > 0) {
      jsonData.originWeighOutKg = wbTransaction.originWeighOutKg;
      jsonData.originWeighOutOperatorName = wbTransaction.originWeighOutOperatorName;
      jsonData.originWeighOutTimestamp = this.ConvertDateStr(wbTransaction.originWeighOutTimestamp);
    }

    if (wbTransaction.destinationWeighInKg > 0) {
      jsonData.destinationWeighInKg = wbTransaction.destinationWeighInKg;
      jsonData.destinationWeighInOperatorName = wbTransaction.destinationWeighInOperatorName;
      jsonData.destinationWeighInTimestamp = this.ConvertDateStr(wbTransaction.destinationWeighInTimestamp);
    }

    if (wbTransaction.destinationWeighOutKg > 0) {
      jsonData.destinationWeighOutKg = wbTransaction.destinationWeighOutKg;
      jsonData.destinationWeighOutOperatorName = wbTransaction.destinationWeighOutOperatorName;
      jsonData.destinationWeighOutTimestamp = this.ConvertDateStr(wbTransaction.destinationWeighOutTimestamp);
    }

    if (wbTransaction.returnWeighInKg > 0) {
      jsonData.returnWeighInKg = wbTransaction.returnWeighInKg;
      jsonData.returnWeighInOperatorName = wbTransaction.returnWeighInOperatorName;
      jsonData.returnWeighInTimestamp = this.ConvertDateStr(wbTransaction.returnWeighInTimestamp);
    }

    if (wbTransaction.returnWeighOutKg > 0) {
      jsonData.returnWeighOutKg = wbTransaction.returnWeighOutKg;
      jsonData.returnWeighOutOperatorName = wbTransaction.returnWeighOutOperatorName;
      jsonData.returnWeighOutTimestamp = this.ConvertDateStr(wbTransaction.returnWeighOutTimestamp);
    }

    if (wbTransaction.loadedSeal1) jsonData.loadedSeal1 = wbTransaction.loadedSeal1;
    if (wbTransaction.loadedSeal2) jsonData.loadedSeal2 = wbTransaction.loadedSeal2;
    if (wbTransaction.loadedSeal3) jsonData.loadedSeal3 = wbTransaction.loadedSeal3;
    if (wbTransaction.loadedSeal4) jsonData.loadedSeal4 = wbTransaction.loadedSeal4;

    if (wbTransaction.unloadedSeal1) jsonData.unloadedSeal1 = wbTransaction.unloadedSeal1;
    if (wbTransaction.unloadedSeal2) jsonData.unloadedSeal2 = wbTransaction.unloadedSeal2;
    if (wbTransaction.unloadedSeal3) jsonData.unloadedSeal3 = wbTransaction.unloadedSeal3;
    if (wbTransaction.unloadedSeal4) jsonData.unloadedSeal4 = wbTransaction.unloadedSeal4;

    if (wbTransaction.returnUnloadedSeal1) jsonData.returnUnloadedSeal1 = wbTransaction.returnUnloadedSeal1;
    if (wbTransaction.returnUnloadedSeal2) jsonData.returnUnloadedSeal2 = wbTransaction.returnUnloadedSeal2;
    if (wbTransaction.returnUnloadedSeal3) jsonData.returnUnloadedSeal3 = wbTransaction.returnUnloadedSeal3;
    if (wbTransaction.returnUnloadedSeal4) jsonData.returnUnloadedSeal4 = wbTransaction.returnUnloadedSeal4;

    return jsonData;
  };

  UpdateEDispatchToWBMS = (wbTransaction) => {
    wbTransaction.vehicleStatus = wbTransaction.jsonData?.vehicleOperationStatus || 0;
    wbTransaction.deliveryStatus = wbTransaction.jsonData?.deliveryStatus || 0;

    wbTransaction.deliveryOrderId = wbTransaction.jsonData?.deliveryOrderId || '';
    wbTransaction.deliveryOrderNo = wbTransaction.jsonData?.deliveryOrderNo || '';
    wbTransaction.deliveryDate = wbTransaction.jsonData?.deliveryDate
      ? moment(wbTransaction.jsonData?.deliveryDate).toDate()
      : null;

    wbTransaction.productCode = wbTransaction.jsonData?.productCode || '';
    wbTransaction.productName = wbTransaction.jsonData?.productName || '';

    wbTransaction.rspoCertificateNumber = wbTransaction.jsonData?.rspoCertificateNumber;
    wbTransaction.rspoSccModel = wbTransaction.jsonData?.rspoSccModel;
    wbTransaction.rspoUniqueNumber = wbTransaction.jsonData?.rspoUniqueNumber;

    wbTransaction.isccCertificateNumber = wbTransaction.jsonData?.isccCertificateNumber;
    wbTransaction.isccSccModel = wbTransaction.jsonData?.isccSccModel;
    wbTransaction.isccUniqueNumber = wbTransaction.jsonData?.isccUniqueNumber;
    wbTransaction.isccGhgValue = wbTransaction.jsonData?.isccGhgValue;
    wbTransaction.isccEeeValue = wbTransaction.jsonData?.isccEeeValue;

    wbTransaction.ispoCertificateNumber = wbTransaction.jsonData?.ispoCertificateNumber;
    wbTransaction.ispoSccModel = wbTransaction.jsonData?.ispoSccModel;
    wbTransaction.ispoUniqueNumber = wbTransaction.jsonData?.ispoUniqueNumber;

    wbTransaction.destinationSiteCode = wbTransaction.jsonData?.destinationSiteCode || '';
    wbTransaction.destinationSiteName = wbTransaction.jsonData?.destinationSiteName || '';

    //ini nanti dipindah ke backend dan ditambahkan untuk seluruh data

    return wbTransaction;
  };

  ConvertDateStr = (date) => {
    return moment(date).local().format(`yyyy-MM-DD[T]HH:mm:ssZZ`);
  };

  edispatchFunctionMapping = {
    1: {
      10: {
        0: async (DecodedQrcode) => {
          return await this.eDispatchPksWbInNormalBefore(DecodedQrcode);
        }
      },
      20: {
        15: async (DecodedQrcode) => {
          return await this.eDispatchPksWbInOutCancelBefore(DecodedQrcode);
        }
      },
      40: {
        10: async (DecodedQrcode) => {
          return await this.eDispatchPksWbOutNormalBefore(DecodedQrcode);
        },
        15: async (DecodedQrcode) => {
          return await this.eDispatchPksWbInOutCancelBefore(DecodedQrcode);
        }
      },
      50: {
        20: async (DecodedQrcode) => {
          return await this.eDispatchPksWbInOutCancelBefore(DecodedQrcode);
        }
      },
      60: {
        26: async (DecodedQrcode) => {
          return await this.eDispatchPksWbInOutRejectBefore(DecodedQrcode);
        }
      }
    },
    2: {
      10: {
        0: async (DecodedQrcode) => {
          return await this.eDispatchT30WbInNormalBefore(DecodedQrcode);
        }
      },
      20: {
        3: async (DecodedQrcode) => {
          return await this.eDispatchT30WbOutNormalCancelBefore(DecodedQrcode);
        }
      },
      50: {
        20: async (DecodedQrcode) => {
          return await this.eDispatchT30WbInOutCancelBefore(DecodedQrcode);
        }
      }
    },
    3: {
      50: {
        20: async (DecodedQrcode) => {
          return await this.eDispatchBulkingWbInNormalBefore(DecodedQrcode);
        },
        22: async (DecodedQrcode) => {
          return await this.eDispatchBulkingWbOutNormalRejectBefore(DecodedQrcode);
        }
      }
    }
  };
}
