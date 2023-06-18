import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { _Schema } from 'src/common/decorator/schema.decorator';

export type TDriversDocument = DriversDocument & Document;

@_Schema()
export class DriversDocument {
  @Prop({ type: String, default: '' })
  pos: string;

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  nationality: string;

  @Prop({ type: String, default: '' })
  car: string;

  @Prop({ type: Number, default: 0 })
  points: number;

  @Prop({ type: Number, default: 0 })
  year: number;
}

export const DriversSchema = SchemaFactory.createForClass(DriversDocument);
