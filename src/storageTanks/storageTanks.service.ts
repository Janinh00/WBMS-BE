import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateStorageTankDto, UpdateStorageTankDto } from './dto';
import { StorageTankEntity } from './entities';

@Injectable()
export class StorageTanksService {
  constructor(private db: DbService) {}

  async getAll(): Promise<StorageTankEntity[]> {
    const records = await this.db.storageTank.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<StorageTankEntity[]> {
    const records = await this.db.storageTank.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<StorageTankEntity> {
    const record = await this.db.storageTank.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<StorageTankEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.storageTank.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<StorageTankEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.storageTank.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<StorageTankEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.storageTank.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<StorageTankEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.storageTank.findMany(query);

    return records;
  }

  async create(dto: CreateStorageTankDto, userId: string): Promise<StorageTankEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.storageTank.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateStorageTankDto, userId: string): Promise<StorageTankEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.storageTank.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<StorageTankEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.storageTank.update(params);

    return record;
  }
}
