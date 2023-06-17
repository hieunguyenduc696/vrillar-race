import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigServiceModule {}
