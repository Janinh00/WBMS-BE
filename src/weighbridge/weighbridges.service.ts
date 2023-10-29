import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateWeighbridgeDto, UpdateWeighbridgeDto } from './dto';
import { WeighbridgeEntity } from './entities';

@Injectable()
export class WeighbridgesService {
  constructor(private db: DbService) {}

  async getAll(): Promise<WeighbridgeEntity[]> {
    const records = await this.db.weighbridge.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<WeighbridgeEntity[]> {
    const records = await this.db.weighbridge.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<WeighbridgeEntity> {
    const record = await this.db.weighbridge.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<WeighbridgeEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.weighbridge.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<WeighbridgeEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.weighbridge.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<WeighbridgeEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.weighbridge.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<WeighbridgeEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.weighbridge.findMany(query);

    return records;
  }

  async create(
    dto: CreateWeighbridgeDto,
    userId: string,
  ): Promise<WeighbridgeEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.weighbridge.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateWeighbridgeDto,
    userId: string,
  ): Promise<WeighbridgeEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.weighbridge.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<WeighbridgeEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.weighbridge.update(params);

    return record;
  }
}
