import { IsDate, IsOptional, IsNumber, IsString } from 'class-validator';
import { EDateFormat } from 'src/common/enum';
import { ToDateFormat } from 'src/common/transformer/common.transformer';

export class UpdateRaceDto {
  @IsOptional()
  @IsString()
  grandPrix: string;

  @IsOptional()
  @ToDateFormat({ format: EDateFormat.COMMON_DATE_FORMAT })
  @IsDate()
  year: number;

  @IsOptional()
  @IsString()
  driver: string;

  @IsOptional()
  @IsString()
  team: string;

  @IsOptional()
  @IsNumber()
  laps: number;

  @IsOptional()
  @IsString()
  time: string;
}
