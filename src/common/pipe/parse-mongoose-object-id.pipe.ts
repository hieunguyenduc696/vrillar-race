import { PipeTransform, HttpStatus, HttpException } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
import { PIPE_ERROR } from './pipe.constants';

export class ParseMongooseObjectID
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    if (!isValidObjectId(value)) {
      throw new HttpException(
        PIPE_ERROR.INVALID_MONGODB_OBJECT_ID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return new Types.ObjectId(value);
  }
}
