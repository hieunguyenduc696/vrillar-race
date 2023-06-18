import { Exclude, Expose } from 'class-transformer';
import { ExposeId } from 'src/common/transformer/common.transformer';

@Exclude()
export class RacesEntity {
  @Expose({ name: '_id' })
  @ExposeId({ name: '_id' })
  id: string;

  @Expose()
  grandPrix: string;

  @Expose()
  date: Date;

  @Expose()
  winner: string;

  @Expose()
  car: string;

  @Expose()
  laps: number;

  @Expose()
  time: string;
}
