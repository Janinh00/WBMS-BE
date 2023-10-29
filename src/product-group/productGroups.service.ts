import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateProductGroupDto, UpdateProductGroupDto } from './dto';
import { ProductGroupEntity } from './entities';

@Injectable()
export class ProductGroupsService {
  constructor(private db: DbService) {}

  async getAll(): Promise<ProductGroupEntity[]> {
    const records = await this.db.productGroup.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<ProductGroupEntity[]> {
    const records = await this.db.productGroup.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<ProductGroupEntity> {
    const record = await this.db.productGroup.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<ProductGroupEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.productGroup.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<ProductGroupEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.productGroup.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<ProductGroupEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.productGroup.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<ProductGroupEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.productGroup.findMany(query);

    return records;
  }

  async create(
    dto: CreateProductGroupDto,
    userId: string,
  ): Promise<ProductGroupEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.productGroup.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateProductGroupDto,
    userId: string,
  ): Promise<ProductGroupEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.productGroup.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<ProductGroupEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.productGroup.update(params);

    return record;
  }
}
