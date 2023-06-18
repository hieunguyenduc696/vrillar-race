import {
  TransformOptions,
  Transform,
  TransformFnParams,
  ExposeOptions,
} from 'class-transformer';
import * as moment from 'moment';

export const ToDateFormat = (options?: TransformOptions & { format: string }) =>
  Transform((params: TransformFnParams) => {
    return moment.utc(params.value, options.format).toDate();
  }, options);

export const ExposeId =
  (options?: ExposeOptions) => (target: object, propertyKey: string) => {
    Transform(
      (params: TransformFnParams) =>
        params.obj[options?.name ? options.name : propertyKey],
    )(target, propertyKey);
  };
