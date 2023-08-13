import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleEntity } from './entities';

@Injectable()
export class RoleService {
  constructor(private db: DbService) {}

  async getAll(): Promise<RoleEntity[]> {
    const records = await this.db.role.findMany();

    return records;
  }

  async getById(id: string): Promise<RoleEntity> {
    const record = await this.db.role.findUnique({ where: { id } });

    return record;
  }

  async searchFirst(query: any): Promise<RoleEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.role.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<RoleEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.role.findMany(query);

    return records;
  }

  async create(dto: CreateRoleDto, userId: string): Promise<RoleEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId
      }
    };

    const record = await this.db.role.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateRoleDto, userId: string): Promise<RoleEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId }
    };

    const record = await this.db.role.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<RoleEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId }
    };

    const record = await this.db.role.update(params);

    return record;
  }
}
