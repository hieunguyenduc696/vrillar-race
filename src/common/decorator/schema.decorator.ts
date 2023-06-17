import { Schema, SchemaOptions } from '@nestjs/mongoose';

export const _Schema = (options?: SchemaOptions) =>
  Schema({
    toJSON: {
      virtuals: true,
      transform: (_, converted) => {
        delete converted._id;
      },
    },
    toObject: {
      getters: true,
    },
    versionKey: false,
    timestamps: true,
    minimize: false,
    ...options,
  });
