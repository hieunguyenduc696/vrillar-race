import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { _Schema } from 'src/common/decorator/schema.decorator';

export type TRacesDocument = RacesDocument & Document;

@_Schema()
export class RacesDocument {
  @Prop({ type: String, default: '' })
  grandPrix: string;

  @Prop({ type: Date, default: new Date() })
  date: Date;

  @Prop({ type: String, default: '' })
  winner: string;

  @Prop({ type: String, default: '' })
  car: string;

  @Prop({ type: Number, default: 0 })
  laps: number;

  @Prop({ type: String, default: '' })
  time: string;
}

export const RacesSchema = SchemaFactory.createForClass(RacesDocument);
