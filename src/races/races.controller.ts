import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesEntity } from './dto/races.entity';
import {
  PaginationRequest,
  TReturnPaging,
} from 'src/common/interface/common.interface';
import { GetRacesDto } from './dto/get-races.dto';
import { Types } from 'mongoose';
import { ParseMongooseObjectID } from 'src/common/pipe/parse-mongoose-object-id.pipe';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Controller('races')
export class RacesController {
  constructor(private racesService: RacesService) {}

  @Post('seek')
  seekData(): Promise<void> {
    return this.racesService.seekData();
  }

  @Post()
  async createRace(
    @Body() createRaceDto: CreateRaceDto,
  ): Promise<{ id: string }> {
    try {
      return await this.racesService.createRace(createRaceDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getAllRaces(
    @Query() paginationRequest: PaginationRequest,
    @Query() getRacesDto: GetRacesDto,
  ): Promise<TReturnPaging<RacesEntity[]>> {
    try {
      return await this.racesService.getAll(paginationRequest, getRacesDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':raceId')
  async getRaceById(
    @Param('raceId', ParseMongooseObjectID) raceId: Types.ObjectId,
  ): Promise<RacesEntity> {
    try {
      return await this.racesService.getById(raceId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':raceId')
  async updateRaceById(
    @Param('raceId', ParseMongooseObjectID) raceId: Types.ObjectId,
    @Body() updateRaceDto: UpdateRaceDto,
  ): Promise<void> {
    try {
      return await this.racesService.updateById(raceId, updateRaceDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':raceId')
  async deleteRaceById(
    @Param('raceId', ParseMongooseObjectID) raceId: Types.ObjectId,
  ): Promise<void> {
    try {
      return await this.racesService.deleteRaceById(raceId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
