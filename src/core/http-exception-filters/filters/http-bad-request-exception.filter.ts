import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpExceptionHelper } from '@src/core/http-exception-filters/helpers/http-exception.helper';
import {
  ExceptionError,
  ResponseJson,
} from '@src/core/http-exception-filters/types/exception.type';
import { Response } from 'express';

/**
 * 400 번 에러를 잡는 exception filter
 */
@Catch(BadRequestException)
export class HttpBadRequestExceptionFilter
  extends HttpExceptionHelper
  implements ExceptionFilter<BadRequestException>
{
  catch(exception: BadRequestException, host: ArgumentsHost): void {
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
