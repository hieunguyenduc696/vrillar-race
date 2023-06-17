import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesSchema } from './schema/races.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: RacesSchema,
        name: 'Races',
      },
    ]),
  ],
  providers: [RacesService],
  controllers: [RacesController],
})
export class RacesModule {}
