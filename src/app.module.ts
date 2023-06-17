import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';

@Module({
  imports: [RacesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
