import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DbService } from 'src/db/db.service';
import { SemaiService } from 'src/semai/semai.service';
import { CreateSiteDto, UpdateSiteDto } from './dto';
import { SiteEntity } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    private db: DbService,
    private config: ConfigService,
    private semaiService: SemaiService,
  ) {}

  async getAll(): Promise<SiteEntity[]> {
    const sites = await this.db.site.findMany({
      where: { isDeleted: false },
    });

    return sites;
  }

  async getAllDeleted(): Promise<SiteEntity[]> {
    const sites = await this.db.site.findMany({
      where: { isDeleted: true },
    });

    return sites;
  }

  async getById(id: string) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {},
    };

    try {
      const record = await this.db.site.findUnique({
        where: { id },
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchFirst(query: any) {
    const dataOut = {
      status: true,
      message: '',
      record: {},
      logs: {},
    };

    try {
      query.where = { ...query.where, isDeleted: false };

      const record = await this.db.site.findFirst({ ...query });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchMany(query: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {},
    };

    try {
      query.where = { ...query.where, isDeleted: false };

      const records = await this.db.site.findMany({ ...query });

      dataOut.records = records;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchFirstDeleted(query: any) {
    const dataOut = {
      status: true,
      message: '',
      record: {},
      logs: {},
    };

    try {
      query.where = { ...query.where, isDeleted: true };

      const record = await this.db.site.findFirst({ ...query });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async searchManyDeleted(query: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {},
    };

    try {
      query.where = { ...query.where, isDeleted: true };

      const records = await this.db.site.findMany({ ...query });

      dataOut.records = records;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async create(dto: CreateSiteDto) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {},
    };

    try {
      const params = {
        data: {
          ...dto,
          userCreated: '',
          userModified: '',
        },
      };

      const record = await this.db.site.create(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async updateById(id: string, dto: UpdateSiteDto) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {},
    };

    try {
      const params = {
        where: { id },
        data: { ...dto, userModified: '' },
      };

      const record = await this.db.site.update(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async deleteById(id: string) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {},
    };

    try {
      const params = {
        where: { id },
        data: { isDeleted: true, userModified: '' },
      };
      const record = await this.db.site.update(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async syncWithSemai() {
    const sites = await this.semaiService.sites().then((res) => res.data.sites);

    sites.forEach((site) => {
      this.db.site
        .findFirstOrThrow({
          where: {
            refType: 1,
            refId: site.id,
          },
        })
        .then((res) => {
          this.db.site
            .update({
              where: { id: res.id },
              data: {
                code: site?.code,
                name: site?.name,
                shortName: site?.shortName,
                companyRefId: site?.companyId,
                companyName: site?.companyName,
                description: site?.description,
                latitude: site?.latitude,
                longitude: site?.longitude,
                solarCalibration: site?.solarCalibration,
                isMill: site?.isMill,
              },
            })
            .then((res) => console.log(res));
        })
        .catch(() => {
          this.db.site
            .create({
              data: {
                refType: 1,
                refId: site.id,
                code: site?.code,
                name: site?.name,
                shortName: site?.shortName,
                companyRefId: site?.companyId,
                companyName: site?.companyName,
                description: site?.description,
                latitude: site?.latitude,
                longitude: site?.longitude,
                solarCalibration: site?.solarCalibration,
                isMill: site?.isMill,

                userCreated: '',
                userModified: '',
              },
            })
            .then((res) => console.log(res));
        });
    });

    return sites;
  }
}
