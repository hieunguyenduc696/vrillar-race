import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetRacesDto {
  @IsOptional()
  @IsString()
  grandPrix: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1950)
  @Max(2023)
  year: number;

  @IsOptional()
  @IsString()
  driver: string;

  @IsOptional()
  @IsString()
  team: string;
}
