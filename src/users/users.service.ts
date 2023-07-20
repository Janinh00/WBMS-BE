import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';

import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async getIAM(id: string): Promise<UserEntity> {
    const user = await this.db.user.findUnique({ where: { id } });

    delete user.hashedPassword;
    delete user.hashedRT;

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const records = await this.db.user.findMany({ where: { isDeleted: false } });

    return records;
  }

  async getAllDeleted(): Promise<UserEntity[]> {
    const records = await this.db.user.findMany({ where: { isDeleted: true } });

    return records;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.db.user.findUnique({ where: { id } });

    return user;
  }

  async searchFirst(query: any): Promise<UserEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.user.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<UserEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.user.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<UserEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.user.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<UserEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.user.findMany(query);

    return records;
  }

  async create(dto: CreateUserDto, userId: string): Promise<UserEntity> {
    // generate the password hash
    const hashedPassword = await hash(dto.password);

    // save the new user in the db
    const user = await this.db.user
      .create({
        data: {
          username: dto.username,
          email: dto.email,
          nik: dto.nik,
          name: dto.name,
          division: dto.division,
          position: dto.position,
          phone: dto.phone,
          hashedPassword: hashedPassword,
          role: dto.role,
          userCreated: userId,
          userModified: userId
        }
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // if (error.code === 'P2002') throw new ForbiddenException('Credentials taken.');
          if (error.code === 'P2002') throw new ForbiddenException('Username/Email/NIK already taken.');
        }

        throw error;
      });

    return user;
  }

  async updateById(id: string, dto: UpdateUserDto, userId: string): Promise<UserEntity> {
    let updateData = new UserEntity();

    if (dto.password) updateData.hashedPassword = await hash(dto.password);

    delete dto.password;

    updateData = { ...updateData, ...dto, userModified: userId };

    const user = await this.db.user
      .update({
        where: { id },
        data: { ...updateData }
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') throw new ForbiddenException('Username/Email/NIK already taken.');
        }

        throw error;
      });

    return user;
  }

  async deleteById(id: string, userId: string) {
    const user = await this.db.user.update({
      where: { id },
      data: { isDisabled: true, isDeleted: true, userModified: userId }
    });

    return user;
  }
}
