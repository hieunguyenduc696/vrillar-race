import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  getConfig() {
    return {
      mongoUrl: this.nestConfigService.get('MONGO_URL'),
      port: this.nestConfigService.get('PORT'),
    };
  }
}
