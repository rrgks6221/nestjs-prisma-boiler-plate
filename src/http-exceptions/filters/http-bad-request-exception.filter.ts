import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';
import { HttpBadRequestException } from '@src/http-exceptions/exceptions/http-bad-request.exception';
import { Response } from 'express';

/**
 * 400 번 에러를 잡는 exception filter
 */
@Catch(HttpBadRequestException)
export class HttpBadRequestExceptionFilter
  implements ExceptionFilter<HttpBadRequestException>
{
  catch(exception: HttpBadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionError = exception.getResponse() as HttpBadRequestException;

    const exceptionResponseDto = new ExceptionResponseDto({
      statusCode: status,
      errorCode: exceptionError.errorCode,
      message: exceptionError.message,
    });

    response.status(status).json(exceptionResponseDto);
  }
}
