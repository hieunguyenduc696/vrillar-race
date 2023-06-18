import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class TReturnPaging<T> {
  @Expose()
  total: number;

  @Expose()
  data: T;
}

@Exclude()
export class PaginationRequest {
  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit: number;
}

export type TCreateUpdateResponse<T> = {
  id: T;
};
