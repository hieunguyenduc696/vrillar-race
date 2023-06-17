import { Controller, Post } from '@nestjs/common';
import { RacesService } from './races.service';

@Controller('races')
export class RacesController {
  constructor(private racesService: RacesService) {}

  @Post('seek')
  seekData(): Promise<void> {
    return this.racesService.seekData();
  }
}
