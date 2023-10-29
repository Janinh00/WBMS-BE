import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

import { ENV, Configs } from '../utils/constants';

@Injectable()
export class ConfigsService {
  constructor(private db: DbService) {}

  async getEnv() {
    const dataOut = {
      status: true,
      message: '',
      data: {},
      logs: {}
    };

    try {
      // const ENV = {
      //   WBMS_SITE_TYPE: this.config.get('WBMS_SITE_TYPE'),

      //   WBMS_SEMAI_API_URL: this.config.get('WBMS_SEMAI_API_URL'),
      //   WBMS_SEMAI_API_KEY: this.config.get('WBMS_SEMAI_API_KEY'),

      //   WBMS_WB_IP: this.config.get('WBMS_WB_IP'),
      //   WBMS_WB_PORT: this.config.get('WBMS_WB_PORT'),
      //   WBMS_WB_MIN_WEIGHT: this.config.get('WBMS_WB_MIN_WEIGHT'),
      //   WBMS_WB_STABLE_PERIOD: this.config.get('WBMS_WB_STABLE_PERIOD')
      // };

      dataOut.data = { ...dataOut.data, ENV };
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async getAll() {
    const records = await this.db.config.findMany({
      where: { isDeleted: false }
    });

    // return records;
    return { ...Configs, ...ENV };
  }

  async searchMany(query: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {}
    };

    try {
      const records = await this.db.config.findMany({
        ...query,
        isDeleted: false
      });

      dataOut.records = records;
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
      logs: {}
    };

    try {
      const record = await this.db.config.findFirst({
        ...query,
        isDeleted: false
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async getById(id: string) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      const record = await this.db.config.findUnique({
        where: { id }
      });

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async create(dto: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      const params = {
        data: {
          ...dto,
          userCreated: '',
          userModified: ''
        }
      };

      const record = await this.db.config.create(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }

  async updateById(id: string, dto: any) {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      record: {},
      logs: {}
    };

    try {
      const params = {
        where: { id },
        data: { ...dto, userModified: '' }
      };

      const record = await this.db.config.update(params);

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
      logs: {}
    };

    try {
      const params = {
        where: { id },
        data: { isDeleted: true, userModified: '' }
      };
      const record = await this.db.config.update(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }
}
