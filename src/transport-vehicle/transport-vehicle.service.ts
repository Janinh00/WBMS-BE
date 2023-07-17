import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateTransportVehicleDto, UpdateTransportVehicleDto } from './dto';
import { TransportVehicleEntity } from './entities';

@Injectable()
export class TransportVehicleService {
  constructor(private db: DbService) {}

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
