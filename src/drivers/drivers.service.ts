import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TDriversDocument } from './schema/drivers.schema';
import * as drivers from 'drivers.json';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Drivers') private driversModel: Model<TDriversDocument>,
  ) {}

  async seekDrivers(): Promise<void> {
    await this.driversModel.insertMany(drivers);
  }

  async getDriverRankingOverPeriod(driverName: string) {
    return await this.driversModel.aggregate([
      {
        $match: {
          name: driverName,
        },
      },
      {
        $group: {
          _id: null,
          yearlyRanking: {
            $push: {
              year: '$year',
              pos: '$pos',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  }
}
