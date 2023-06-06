import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpExceptionHelper } from '@src/core/exception/helpers/http-exception.helper';
import {
  ExceptionError,
  ResponseJson,
} from '@src/core/exception/types/exception.type';
import { Response } from 'express';

/**
 * 다른 exception filter 가 잡지않는 exception 을 잡는 필터
 */
@Catch(HttpException)
export class HttpRemainderExceptionFilter
  extends HttpExceptionHelper
  implements ExceptionFilter<HttpException>
{
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionError = exception.getResponse() as ExceptionError;

    const responseJson: ResponseJson = this.buildResponseJson(
      status,
      exceptionError,
    );

    response.status(status).json(responseJson);
  }
}
