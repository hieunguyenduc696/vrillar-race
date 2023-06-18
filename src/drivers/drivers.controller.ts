import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { YearlyRankingEntity } from './dto/get-driver-yearly-ranking.entity';
import { plainToInstance } from 'class-transformer';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Post('seek')
  seekDrivers(): Promise<void> {
    return this.driversService.seekDrivers();
  }

  @Get(':driverName/ranking')
  async getDriverRankingOverPeriod(
    @Param('driverName') driverName: string,
  ): Promise<YearlyRankingEntity[]> {
    try {
      const data = await this.driversService.getDriverRankingOverPeriod(
        driverName,
      );

      return plainToInstance(
        YearlyRankingEntity,
        data[0].yearlyRanking as YearlyRankingEntity[],
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
