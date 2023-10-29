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

  // const httpsAgent = new https.Agent({
  //   cert: fs.readFileSync(this.WBMS_SEMAI_CERT),
  //   key: fs.readFileSync(this.WBMS_SEMAI_KEY)
  // });

  // const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  api = axios.create({
    baseURL: `${this.WBMS_SEMAI_API_URL}/`,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    // httpsAgent: this.httpsAgent,
    headers: {
      'x-api-key': this.WBMS_SEMAI_API_KEY
    }
  });

  async products() {
    const response = await this.api.get(`products?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async sites() {
    const response = await this.api.get(`sites?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async storageTanks() {
    const response = await this.api.get(`storage-tanks?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async transportVehicles() {
    const response = await this.api.get(`transport-vehicles?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async transporters() {
    const response = await this.api.get(`transporters?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async vehicleOperators() {
    const response = await this.api.get(`vehicle-operators?pageSize=0`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async decodeQrcode(dto: DecodeQrcodeDto) {
    const response = await this.api.post(`cmd/decode-qrcode`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async encodeQrcode(dto: any) {
    const { orderId, functionCode } = dto;

    const response = await this.api.get(`cmd/encode-qrcode/${orderId}/${functionCode}`).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async initiateDelivery(dto: any) {
    const response = await this.api.post(`cmd/initiate-delivery`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async dispatchDelivery(dto: any) {
    const response = await this.api.post(`cmd/dispatch-delivery`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async rejectDelivery(dto: any) {
    const response = await this.api.post(`cmd/reject-delivery`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async closeDeliveryCanceled(dto: any) {
    const response = await this.api.post(`cmd/close-delivery-as-canceled`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async closeDeliveryAccepted(dto: any) {
    const response = await this.api.post(`cmd/close-delivery-as-accepted`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async closeDeliveryRejected(dto: any) {
    const response = await this.api.post(`cmd/close-delivery-as-rejected`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async validateDispatchDelivery(dto: any) {
    const response = await this.api.post(`cmd/validate-dispatch-delivery`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async initiateUnloading(dto: any) {
    const response = await this.api.post(`cmd/initiate-unloading`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }

  async validateUnloading(dto: any) {
    const response = await this.api.post(`cmd/validate-unloading`, dto).then((res) => res?.data);

    if (!response.success) throw new Error(response?.message);

    return response;
  }
}
