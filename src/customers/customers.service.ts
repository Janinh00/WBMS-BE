import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { CustomerEntity } from './entities';

@Injectable()
export class CustomersService {
  constructor(private db: DbService) {}

  async getAll(): Promise<CustomerEntity[]> {
    const records = await this.db.customer.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<CustomerEntity[]> {
    const records = await this.db.customer.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<CustomerEntity> {
    const record = await this.db.customer.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<CustomerEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.customer.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<CustomerEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.customer.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<CustomerEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.customer.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<CustomerEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.customer.findMany(query);

    return records;
  }

  async create(
    dto: CreateCustomerDto,
    userId: string,
  ): Promise<CustomerEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.customer.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateCustomerDto,
    userId: string,
  ): Promise<CustomerEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.customer.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CustomerEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.customer.update(params);

    return record;
  }
}
