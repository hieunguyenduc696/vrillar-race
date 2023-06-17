import { ConfigService } from '@nestjs/config';

export type TConfiguration = {
  mongoUrl: string;
  dbName: string;
};

export type TConfigService = ConfigService<TConfiguration>;
