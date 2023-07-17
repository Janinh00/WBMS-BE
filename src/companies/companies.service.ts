import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { CompanyEntity } from './entities';

@Injectable()
export class CompaniesService {
  constructor(private db: DbService) {}

  async getAll(): Promise<CompanyEntity[]> {
    const records = await this.db.company.findMany({
      where: { isDeleted: false },
    });

    return records;
  }

  async getAllDeleted(): Promise<CompanyEntity[]> {
    const records = await this.db.company.findMany({
      where: { isDeleted: true },
    });

    return records;
  }

  async getById(id: string): Promise<CompanyEntity> {
    const record = await this.db.company.findUnique({
      where: { id },
    });

    return record;
  }

  async searchFirst(query: any): Promise<CompanyEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.company.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<CompanyEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.company.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<CompanyEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.company.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<CompanyEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.company.findMany(query);

    return records;
  }

  async create(dto: CreateCompanyDto, userId: string): Promise<CompanyEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId,
      },
    };

    const record = await this.db.company.create(params);

    return record;
  }

  async updateById(
    id: string,
    dto: UpdateCompanyDto,
    userId: string,
  ): Promise<CompanyEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId },
    };

    const record = await this.db.company.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CompanyEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId },
    };

    const record = await this.db.company.update(params);

    return record;
  }
}
