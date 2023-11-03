import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpExceptionService } from '@src/http-exceptions/services/http-exception.service';
import { Response } from 'express';

/**
 * api not found 에러를 잡는 필터
 */
@Catch(NotFoundException)
export class HttpPathNotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
  constructor(private readonly httpExceptionService: HttpExceptionService) {}

  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const method = ctx.getRequest().method;
    const path = ctx.getRequest().path;

    const statusCode = exception.getStatus();
    const exceptionError = {
      errorCode: ERROR_CODE.CODE002,
      message: method + ' ' + path + ' ' + 'not found',
    };

    const responseJson = this.httpExceptionService.buildResponseJson(
      statusCode,
      exceptionError,
    );

    response.status(statusCode).json(responseJson);
  }
}
