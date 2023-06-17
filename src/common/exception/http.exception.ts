import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    this.catchHttp(exception, host);
  }

  private catchHttp(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).send({
      ...this.extractMessage(message),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractMessage(message: string | any): object {
    if (typeof message === 'string') {
      return { message };
    }
    return { message: message?.message || 'Unknown' };
  }
}
