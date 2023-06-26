import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class WeighbridgesService {
  constructor(private db: DbService) {}

  async getAll() {
    const dataOut = {
      status: true,
      message: '',
      page: 0,
      totalRecords: 0,
      records: {},
      logs: {},
    };

    try {
      const records = await this.db.weighbridge.findMany({
        where: { isDeleted: false },
      });

      dataOut.records = records;
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
      const records = await this.db.weighbridge.findMany({
        ...query,
        isDeleted: false,
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
      logs: {},
    };

    try {
      const record = await this.db.weighbridge.findFirst({
        ...query,
        isDeleted: false,
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
      logs: {},
    };

    try {
      const record = await this.db.weighbridge.findUnique({
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

  async create(dto: any) {
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

      const record = await this.db.weighbridge.create(params);

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
      logs: {},
    };

    try {
      const params = {
        where: { id },
        data: { ...dto, userModified: '' },
      };

      const record = await this.db.weighbridge.update(params);

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
      const record = await this.db.weighbridge.update(params);

      dataOut.record = record;
    } catch (error) {
      dataOut.status = false;
      dataOut.message = error.message;
      dataOut.logs = { error };
    }

    return dataOut;
  }
}