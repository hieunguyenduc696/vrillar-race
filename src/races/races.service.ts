import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as data from 'data.json';
import { Model } from 'mongoose';
import { TRacesDocument } from './schema/races.schema';

@Injectable()
export class RacesService {
  constructor(
    @InjectModel('Races') private racesModel: Model<TRacesDocument>,
  ) {}

  async seekData(): Promise<void> {
    await this.racesModel.insertMany(data);
  }
}
