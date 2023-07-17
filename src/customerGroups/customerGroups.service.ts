import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateCustomerGroupDto, UpdateCustomerGroupDto } from './dto';
import { CustomerGroupEntity } from './entities';

@Injectable()
export class CustomerGroupsService {
  constructor(private db: DbService) {}

  async getAll(): Promise<CustomerGroupEntity[]> {
    const records = await this.db.customerGroup.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<CustomerGroupEntity[]> {
    const records = await this.db.customerGroup.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<CustomerGroupEntity> {
    const record = await this.db.customerGroup.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<CustomerGroupEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.customerGroup.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<CustomerGroupEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.customerGroup.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<CustomerGroupEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.customerGroup.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<CustomerGroupEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.customerGroup.findMany(query);

    return records;
  }

  async create(
    dto: CreateCustomerGroupDto,
    userId: string,
  ): Promise<CustomerGroupEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.customerGroup.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateCustomerGroupDto,
    userId: string,
  ): Promise<CustomerGroupEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.customerGroup.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CustomerGroupEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.customerGroup.update(params);

    return record;
  }
}
