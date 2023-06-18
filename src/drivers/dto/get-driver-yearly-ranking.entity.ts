import { Expose } from 'class-transformer';

export class YearlyRankingEntity {
  @Expose()
  year: number;

  @Expose()
  pos: string;
}
