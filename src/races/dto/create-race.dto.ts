import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EDateFormat } from 'src/common/enum';
import { ToDateFormat } from 'src/common/transformer/common.transformer';

export class CreateRaceDto {
  @IsNotEmpty()
  @IsString()
  grandPrix: string;

  @ToDateFormat({ format: EDateFormat.COMMON_DATE_FORMAT })
  @IsDate()
  year: number;

  @IsNotEmpty()
  @IsString()
  driver: string;

  @IsNotEmpty()
  @IsString()
  team: string;

  @IsNotEmpty()
  @IsNumber()
  laps: number;

  @IsNotEmpty()
  @IsString()
  time: string;
}
