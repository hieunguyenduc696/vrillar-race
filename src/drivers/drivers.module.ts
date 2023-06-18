import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversSchema } from './schema/drivers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: DriversSchema,
        name: 'Drivers',
      },
    ]),
  ],
  providers: [DriversService],
  controllers: [DriversController],
})
export class DriversModule {}
