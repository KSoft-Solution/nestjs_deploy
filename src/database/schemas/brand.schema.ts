import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandSchema = Brand & Document;

@Schema()
export class Brand {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  state: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String, required: false })
  brand_image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
