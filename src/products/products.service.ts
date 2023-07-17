import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entities';

@Injectable()
export class ProductsService {
  constructor(private db: DbService) {}

  async getAll(): Promise<ProductEntity[]> {
    const records = await this.db.product.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<ProductEntity[]> {
    const records = await this.db.product.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<ProductEntity> {
    const record = await this.db.product.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<ProductEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.product.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<ProductEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.product.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<ProductEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.product.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<ProductEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.product.findMany(query);

    return records;
  }

  async create(dto: CreateProductDto, userId: string): Promise<ProductEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.product.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateProductDto,
    userId: string,
  ): Promise<ProductEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.product.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<ProductEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.product.update(params);

    return record;
  }
}
