import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateProvinceDto, UpdateProvinceDto } from './dto';
import { ProvinceEntity } from './entities';

@Injectable()
export class ProvincesService {
  constructor(private db: DbService) {}

  async getAll(): Promise<ProvinceEntity[]> {
    const records = await this.db.province.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<ProvinceEntity[]> {
    const records = await this.db.province.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<ProvinceEntity> {
    const record = await this.db.province.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<ProvinceEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.province.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<ProvinceEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.province.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<ProvinceEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.province.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<ProvinceEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.province.findMany(query);

    return records;
  }

  async create(dto: CreateProvinceDto, userId: string): Promise<ProvinceEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.province.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateProvinceDto, userId: string): Promise<ProvinceEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.province.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<ProvinceEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.province.update(params);

    return record;
  }
}
