import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateCityDto, UpdateCityDto } from './dto';
import { CityEntity } from './entities';

@Injectable()
export class CitiesService {
  constructor(private db: DbService) {}

  async getAll(): Promise<CityEntity[]> {
    const records = await this.db.city.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<CityEntity[]> {
    const records = await this.db.city.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<CityEntity> {
    const record = await this.db.city.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<CityEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.city.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<CityEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.city.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<CityEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.city.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<CityEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.city.findMany(query);

    return records;
  }

  async create(dto: CreateCityDto, userId: string): Promise<CityEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.city.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateCityDto,
    userId: string,
  ): Promise<CityEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.city.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CityEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.city.update(params);

    return record;
  }
}
