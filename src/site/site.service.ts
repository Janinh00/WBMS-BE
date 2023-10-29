import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { SemaiService } from 'src/semai/semai.service';
import { CreateSiteDto, UpdateSiteDto } from './dto';
import { SiteEntity } from './entities/site.entity';

@Injectable()
export class SiteService {
  constructor(
    private db: DbService,
    private semaiService: SemaiService
  ) {}

  async eDispatchSync(userId: string) {
    const sites = await this.semaiService.sites().then((res) => res.records);

    // if (sites?.length > 0)
    //   sites.forEach((site) => {
    //     this.db.site
    //       .findFirstOrThrow({
    //         where: {
    //           refType: 1,
    //           refId: site.id
    //         }
    //       })
    //       .then((res) => {
    //         this.db.site
    //           .update({
    //             where: { id: res.id },
    //             data: {
    //               sourceSiteRefId: site?.sourceSiteId,
    //               sourceSiteName: site?.sourceSiteName,

    //               companyRefId: site?.companyId,
    //               companyName: site?.companyName,

    //               code: site?.code,
    //               codeSap: site?.code,
    //               name: site?.name,
    //               shortName: site?.shortName,
    //               description: site?.description,

    //               latitude: site?.latitude,
    //               longitude: site?.longitude,
    //               solarCalibration: site?.solarCalibration,

    //               isMill: site?.isMill,

    //               isDeleted: !!site?.isDeleted,

    //               userCreated: userId,
    //               userModified: userId
    //             }
    //           })
    //           .then();
    //       })
    //       .catch(() => {
    //         this.db.site
    //           .create({
    //             data: {
    //               refType: 1,
    //               refId: site.id,

    //               sourceSiteRefId: site?.sourceSiteId,
    //               sourceSiteName: site?.sourceSiteName,

    //               companyRefId: site?.companyId,
    //               companyName: site?.companyName,

    //               code: site?.code,
    //               codeSap: site?.code,
    //               name: site?.name,
    //               shortName: site?.shortName,
    //               description: site?.description,

    //               latitude: site?.latitude,
    //               longitude: site?.longitude,
    //               solarCalibration: site?.solarCalibration,

    //               isMill: site?.isMill,

    //               isDeleted: !!site?.isDeleted,

    //               userCreated: userId,
    //               userModified: userId
    //             }
    //           })
    //           .then();
    //       });
    //   });

    // if (sites?.length > 0) {
    //   const res = await Promise.all(sites.map(async (site) => {}));

    //   return res;
    // }

    // return sites;

    if (sites?.length > 0) {
      for (const site of sites) {
        await this.db.site
          .findFirstOrThrow({
            where: {
              refType: 1,
              refId: site.id
            }
          })
          .then(async (res) => {
            await this.db.site.update({
              where: { id: res.id },
              data: {
                sourceSiteRefId: site?.sourceSiteId,
                sourceSiteName: site?.sourceSiteName,

                companyRefId: site?.companyId,
                companyName: site?.companyName,

                code: site?.code,
                codeSap: site?.code,
                name: site?.name,
                shortName: site?.shortName,
                description: site?.description,

                latitude: site?.latitude,
                longitude: site?.longitude,
                solarCalibration: site?.solarCalibration,

                isMill: site?.isMill,

                isDeleted: !!site?.isDeleted,

                userCreated: userId,
                userModified: userId
              }
            });
          })
          .catch(async () => {
            await this.db.site.create({
              data: {
                refType: 1,
                refId: site.id,

                sourceSiteRefId: site?.sourceSiteId,
                sourceSiteName: site?.sourceSiteName,

                companyRefId: site?.companyId,
                companyName: site?.companyName,

                code: site?.code,
                codeSap: site?.code,
                name: site?.name,
                shortName: site?.shortName,
                description: site?.description,

                latitude: site?.latitude,
                longitude: site?.longitude,
                solarCalibration: site?.solarCalibration,

                isMill: site?.isMill,

                isDeleted: !!site?.isDeleted,

                userCreated: userId,
                userModified: userId
              }
            });
          });
      }

      return true;
    }

    return false;
  }

  async getAll(): Promise<SiteEntity[]> {
    const records = await this.db.site.findMany({
      where: { isDeleted: false }
    });

    return records;
  }

  async getAllDeleted(): Promise<SiteEntity[]> {
    const records = await this.db.site.findMany({
      where: { isDeleted: true }
    });

    return records;
  }

  async getById(id: string): Promise<SiteEntity> {
    const record = await this.db.site.findUnique({
      where: { id }
    });

    return record;
  }

  async searchFirst(query: any): Promise<SiteEntity> {
    query.where = { ...query.where, isDeleted: false };

    const record = await this.db.site.findFirst(query);

    return record;
  }

  async searchMany(query: any): Promise<SiteEntity[]> {
    query.where = { ...query.where, isDeleted: false };

    const records = await this.db.site.findMany(query);

    return records;
  }

  async searchFirstDeleted(query: any): Promise<SiteEntity> {
    query.where = { ...query.where, isDeleted: true };

    const record = await this.db.site.findFirst(query);

    return record;
  }

  async searchManyDeleted(query: any): Promise<SiteEntity[]> {
    query.where = { ...query.where, isDeleted: true };

    const records = await this.db.site.findMany(query);

    return records;
  }

  async create(dto: CreateSiteDto, userId: string): Promise<SiteEntity> {
    const params = {
      data: {
        ...dto,
        userCreated: userId,
        userModified: userId
      }
    };

    const record = await this.db.site.create(params);

    return record;
  }

  async updateById(id: string, dto: UpdateSiteDto, userId: string): Promise<SiteEntity> {
    const params = {
      where: { id },
      data: { ...dto, userModified: userId }
    };

    const record = await this.db.site.update(params);

    return record;
  }

  async deleteById(id: string, userId: string): Promise<SiteEntity> {
    const params = {
      where: { id },
      data: { isDeleted: true, userModified: userId }
    };

    const record = await this.db.site.update(params);

    return record;
  }
}
