import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { SemaiService } from 'src/semai/semai.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { CompanyEntity } from './entities';

@Injectable()
export class CompanyService {
  constructor(
    private db: DbService,
    private semaiService: SemaiService
  ) {}

  async syncWithEDispatch(userId: string) {
    const transporters = await this.semaiService.transporters().then((res) => res.records);

    if (transporters?.length > 0)
      transporters.forEach((transporter) => {
        this.db.company
          .findFirstOrThrow({
            where: {
              refType: 1,
              refId: transporter.id
            }
          })
          .then((res) => {
            this.db.company
              .update({
                where: { id: res.id },
                data: {
                  code: transporter?.code,
                  codeSap: transporter?.code,
                  name: transporter?.name,
                  shortName: transporter?.shortName,
                  address: transporter?.address,
                  addressExt: transporter?.addressExt,
                  postalCode: transporter?.postalCode,
                  country: transporter?.country,
                  province: transporter?.province,
                  city: transporter?.city,
                  phone: transporter?.phone,
                  url: transporter?.url,

                  contactName: transporter?.contactName,
                  contactEmail: transporter?.contactEmail,
                  contactPhone: transporter?.contactPhone,

                  isMillOperator: transporter?.isMill,
                  isTransporter: transporter?.isTransporter,
                  isSiteOperator: false,
                  isEstate: transporter?.isEstate,

                  isDeleted: !!transporter?.isDeleted,

                  userCreated: userId,
                  userModified: userId
                }
              })
              .then((res) => console.log(res));
          })
          .catch(() => {
            this.db.company
              .create({
                data: {
                  refType: 1,
                  refId: transporter.id,

                  code: transporter?.code,
                  codeSap: transporter?.code,
                  name: transporter?.name,
                  shortName: transporter?.shortName,
                  address: transporter?.address,
                  addressExt: transporter?.addressExt,
                  postalCode: transporter?.postalCode,
                  country: transporter?.country,
                  province: transporter?.province,
                  city: transporter?.city,
                  phone: transporter?.phone,
                  url: transporter?.url,

                  contactName: transporter?.contactName,
                  contactEmail: transporter?.contactEmail,
                  contactPhone: transporter?.contactPhone,

                  isMillOperator: transporter?.isMill,
                  isTransporter: transporter?.isTransporter,
                  isSiteOperator: false,
                  isEstate: transporter?.isEstate,

                  isDeleted: !!transporter?.isDeleted,

                  userCreated: userId,
                  userModified: userId
                }
              })
              .then((res) => console.log(res));
          });
      });

    return transporters;
  }

  async getAll(): Promise<CompanyEntity[]> {
    const records = await this.db.company.findMany({
      where: { isDeleted: false }
    });

    return records;
  }

  async getAllDeleted(): Promise<CompanyEntity[]> {
    const records = await this.db.company.findMany({
      where: { isDeleted: true }
    });

    return records;
  }

  async getById(id: string): Promise<CompanyEntity> {
    const record = await this.db.company.findUnique({
      where: { id }
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
        userModified: userId
      }
    };

    const record = await this.db.company.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateCompanyDto, userId: string): Promise<CompanyEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId }
    };

    const record = await this.db.company.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<CompanyEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId }
    };

    const record = await this.db.company.update(params);

    return record;
  }
}
