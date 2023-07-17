import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
import * as https from 'https';

import { DbService } from 'src/db/db.service';
import { DecodeQrcodeDto } from './dto/decode-qrcode.dto';
import { UpdateSemaiDto } from './dto/update-semai.dto';

@Injectable()
export class SemaiService {
  constructor(
    private db: DbService,
    private config: ConfigService
  ) {}

  WBMS_SEMAI_API_URL = this.config.get('WBMS_SEMAI_API_URL');
  WBMS_SEMAI_API_KEY = this.config.get('WBMS_SEMAI_API_KEY');
  WBMS_SEMAI_CERT = this.config.get('WBMS_SEMAI_CERT');
  WBMS_SEMAI_KEY = this.config.get('WBMS_SEMAI_KEY');

  httpsAgent = new https.Agent({
    cert: fs.readFileSync(this.WBMS_SEMAI_CERT),
    key: fs.readFileSync(this.WBMS_SEMAI_KEY)
  });

  // httpsAgent: this.httpsAgent,
  api = axios.create({
    baseURL: `${this.WBMS_SEMAI_API_URL}/`,
    httpsAgent: this.httpsAgent,
    headers: {
      'x-api-key': this.WBMS_SEMAI_API_KEY
    }
  });

  create(createSemaiDto: DecodeQrcodeDto) {
    return 'This action adds a new semai';
  }

  findAll() {
    return `This action returns all semai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} semai`;
  }

  update(id: number, updateSemaiDto: UpdateSemaiDto) {
    return `This action updates a #${id} semai`;
  }

  remove(id: number) {
    return `This action removes a #${id} semai`;
  }

  async products() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        products: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`products?pageSize=0`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.products = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async sites() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        sites: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`sites?pageSize=0`).then((res) => res?.data);
      console.log('response:');
      console.log(response);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.sites = response.records;
    } catch (error) {
      console.log('error');
      console.log(error);
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async storageTanks() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        storageTanks: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`storage-tanks?pageSize=0`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.storageTanks = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async transportVehicles() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transportVehicles: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`transport-vehicles?pageSize=0`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transportVehicles = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async transporters() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transporters: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`transporters?pageSize=0`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transporters = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async vehicleOperators() {
    const dataOut = {
      status: true,
      message: '',
      data: {
        vehicleOperators: []
      },
      logs: {}
    };

    try {
      const response = await this.api.get(`vehicle-operators?pageSize=0`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.vehicleOperators = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async decodeQrcode(dto: DecodeQrcodeDto) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        decodedQrcode: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/decode-qrcode`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.decodedQrcode = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async encodeQrcode(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        qrcode: {}
      },
      logs: {}
    };

    try {
      const orderId = dto.orderId;
      const functionCode = dto.functionCode;

      console.log(dto);

      const response = await this.api.get(`cmd/encode-qrcode/${orderId}/${functionCode}`).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.qrcode = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async dispatchDelivery(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      console.log(dto);

      const response = await this.api.post(`cmd/dispatch-delivery`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async rejectDelivery(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/reject-delivery`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async closeDeliveryCanceled(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/close-delivery-as-canceled`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async closeDeliveryAccepted(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/close-delivery-as-accepted`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async closeDeliveryRejected(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      console.log('data in');
      console.log(dto);

      const response = await this.api.post(`cmd/close-delivery-as-rejected`, dto).then((res) => res?.data);

      console.log('hasil api close-delivery-as-rejected');
      console.log(response);

      if (!response.success) {
        dataOut.logs = { ...dataOut.logs, response };
        throw new Error(response?.message);
      }

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { ...dataOut.logs, error };
    }

    return dataOut;
  }

  async validateDispatchDelivery(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/validate-dispatch-delivery`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async validateUnloading(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      data: {
        transaction: {}
      },
      logs: {}
    };

    try {
      const response = await this.api.post(`cmd/validate-unloading`, dto).then((res) => res?.data);

      if (!response.success) throw new Error(response?.message);

      dataOut.data.transaction = response.record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }
}
