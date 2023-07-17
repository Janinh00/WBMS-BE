import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateCustomerTypeDto, UpdateCustomerTypeDto } from './dto';
import { CustomerTypeEntity } from './entities';

@Injectable()
export class CustomerTypesService {
  constructor(private db: DbService) {}

  async getAll(): Promise<CustomerTypeEntity[]> {
    const records = await this.db.customerType.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<CustomerTypeEntity[]> {
    const records = await this.db.customerType.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<CustomerTypeEntity> {
    const record = await this.db.customerType.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<CustomerTypeEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.customerType.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<CustomerTypeEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.customerType.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<CustomerTypeEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.customerType.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<CustomerTypeEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.customerType.findMany(query);

    return records;
  }

  async create(
    dto: CreateCustomerTypeDto,
    userId: string,
  ): Promise<CustomerTypeEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.customerType.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateCustomerTypeDto,
    userId: string,
  ): Promise<CustomerTypeEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.customerType.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CustomerTypeEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.customerType.update(params);

    return record;
  }
}
