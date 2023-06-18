import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as data from 'data.json';
import { Model, Types } from 'mongoose';
import { TRacesDocument } from './schema/races.schema';
import { RacesEntity } from './dto/races.entity';
import { plainToInstance } from 'class-transformer';
import {
  PaginationRequest,
  TReturnPaging,
} from 'src/common/interface/common.interface';
import { GetRacesDto } from './dto/get-races.dto';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RacesService {
  constructor(
    @InjectModel('Races') private racesModel: Model<TRacesDocument>,
  ) {}

  async seekData(): Promise<void> {
    await this.racesModel.insertMany(data);
  }

  async createRace(createRaceDto: CreateRaceDto): Promise<{ id: string }> {
    const newRace = new this.racesModel({
      grandPrix: createRaceDto.grandPrix,
      date: createRaceDto.year,
      winner: createRaceDto.driver,
      car: createRaceDto.team,
      laps: createRaceDto.laps,
      time: createRaceDto.time,
    });

    await newRace.save();

    return { id: newRace.id };
  }

  async getAll(
    paginationRequest: PaginationRequest,
    getRacesDto: GetRacesDto,
  ): Promise<TReturnPaging<RacesEntity[]>> {
    const races = await this.racesModel.aggregate([
      {
        $addFields: {
          isMatchGrandPrix: {
            $regexMatch: {
              input: {
                $toUpper: '$grandPrix',
              },
              regex: {
                $toUpper: getRacesDto.grandPrix,
              },
            },
          },
          isMatchDriver: {
            $regexMatch: {
              input: {
                $toUpper: '$winner',
              },
              regex: {
                $toUpper: getRacesDto.driver,
              },
            },
          },
          isMatchTeam: {
            $regexMatch: {
              input: {
                $toUpper: '$car',
              },
              regex: {
                $toUpper: getRacesDto.team,
              },
            },
          },
        },
      },
      {
        $match: {
          isMatchGrandPrix: true,
          isMatchDriver: true,
          isMatchTeam: true,
          $expr: {
            $or: [
              !getRacesDto.year,
              {
                $eq: [
                  {
                    $year: '$date',
                  },
                  getRacesDto.year,
                ],
              },
            ],
          },
        },
      },
    ]);

    const { page, limit } = paginationRequest;

    if (page && limit) {
      return {
        total: races.length,
        data: plainToInstance(
          RacesEntity,
          races.slice((page - 1) * limit, (page - 1) * limit + limit),
        ),
      };
    }

    return {
      total: races.length,
      data: plainToInstance(RacesEntity, races),
    };
  }

  async getById(raceId: Types.ObjectId): Promise<RacesEntity> {
    const race = await this.racesModel.findById(raceId);

    return plainToInstance(RacesEntity, race);
  }

  async updateById(
    raceId: Types.ObjectId,
    updateRaceDto: UpdateRaceDto,
  ): Promise<void> {
    await this.racesModel.findByIdAndUpdate(raceId, {
      $set: {
        grandPrix: updateRaceDto.grandPrix,
        date: updateRaceDto.year,
        winner: updateRaceDto.driver,
        car: updateRaceDto.team,
        laps: updateRaceDto.laps,
        time: updateRaceDto.time,
      },
    });
  }

  async deleteRaceById(raceId: Types.ObjectId): Promise<void> {
    await this.racesModel.findByIdAndDelete(raceId);
  }
}
