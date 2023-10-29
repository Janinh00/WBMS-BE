import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { DbService } from 'src/db/db.service';
import { SemaiService } from 'src/semai/semai.service';
import { CreateTransportVehicleDto, UpdateTransportVehicleDto } from './dto';
import { TransportVehicleEntity } from './entities';

@Injectable()
export class TransportVehicleService {
  constructor(
    private db: DbService,
    private semaiService: SemaiService
  ) {}
  // moment(wbTransaction.jsonData?.deliveryDate).toDate()

  async eDispatchSync(userId: string) {
    const transportVehicles = await this.semaiService.transportVehicles().then((res) => res.records);

    if (transportVehicles?.length > 0) {
      for (const transportVehicle of transportVehicles) {
        this.db.site
          .findFirstOrThrow({
            where: {
              refType: 1,
              refId: transportVehicle.id
            }
          })
          .then(async (res) => {
            await this.db.transportVehicle.update({
              where: { id: res.id },
              data: {
                companyRefId: transportVehicle?.companyId,
                companyName: transportVehicle?.companyName,

                productRefId: transportVehicle?.productId,
                productName: transportVehicle?.productName,

                code: transportVehicle?.code,
                codeSap: transportVehicle?.code,
                plateNo: transportVehicle?.plateNo,
                description: transportVehicle?.description,

                capacity: transportVehicle?.capacityKg,
                brand: transportVehicle?.brand,
                model: transportVehicle?.model,
                sccModel: transportVehicle?.allowableSccModel,

                licenseED: moment(transportVehicle?.licenseExpiryDate).toDate(),
                keurED: moment(transportVehicle?.keurExpriryDate).toDate(),

                isDeleted: !!transportVehicle?.isDeleted,

                userCreated: userId,
                userModified: userId
              }
            });
          })
          .catch(async () => {
            await this.db.transportVehicle.create({
              data: {
                refType: 1,
                refId: transportVehicle.id,

                companyRefId: transportVehicle?.companyId,
                companyName: transportVehicle?.companyName,

                productRefId: transportVehicle?.productId,
                productName: transportVehicle?.productName,

                code: transportVehicle?.code,
                codeSap: transportVehicle?.code,
                plateNo: transportVehicle?.plateNo,
                description: transportVehicle?.description,

                capacity: transportVehicle?.capacityKg,
                brand: transportVehicle?.brand,
                model: transportVehicle?.model,
                sccModel: transportVehicle?.allowableSccModel,

                licenseED: moment(transportVehicle?.licenseExpiryDate).toDate(),
                keurED: moment(transportVehicle?.keurExpriryDate).toDate(),

                isDeleted: !!transportVehicle?.isDeleted,

                userCreated: userId,
                userModified: userId
              }
            });
          });
      }

      return true;
    }

    return false;
  }

  async getAll(): Promise<TransportVehicleEntity[]> {
    const records = await this.db.transportVehicle.findMany({
      where: { isDeleted: false }
    });

    return records;
  }

  async getAllDeleted(): Promise<TransportVehicleEntity[]> {
    const records = await this.db.transportVehicle.findMany({
      where: { isDeleted: true }
    });

    return records;
  }

  async getById(id: string): Promise<TransportVehicleEntity> {
    const record = await this.db.transportVehicle.findUnique({
      where: { id }
    });

    return record;
  }

  async searchFirst(query: any): Promise<TransportVehicleEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.transportVehicle.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<TransportVehicleEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.transportVehicle.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<TransportVehicleEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.transportVehicle.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<TransportVehicleEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.transportVehicle.findMany(query);

    return records;
  }

  async create(dto: CreateTransportVehicleDto, userId: string): Promise<TransportVehicleEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId
      }
    };

    const record = await this.db.transportVehicle.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateTransportVehicleDto, userId: string): Promise<TransportVehicleEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId }
    };

    const record = await this.db.transportVehicle.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<TransportVehicleEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId }
    };

    const record = await this.db.transportVehicle.update(params);

    return record;
  }
}
