import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';
import { Response } from 'express';

/**
 * api not found 에러를 잡는 필터
 */
@Catch(NotFoundException)
export class HttpPathNotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const method = ctx.getRequest().method;
    const path = ctx.getRequest().path;
    const exceptionError = {
      errorCode: ERROR_CODE.CODE002,
      message: method + ' ' + path + ' ' + 'not found',
    };

    const exceptionResponseDto = new ExceptionResponseDto({
      statusCode: status,
      errorCode: exceptionError.errorCode,
      message: exception.message,
    });

    response.status(status).json(exceptionResponseDto);
  }
}
