import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';
import { HttpNotFoundException } from '@src/http-exceptions/exceptions/http-not-found.exception';
import { Response } from 'express';

/**
 * 404 번 에러를 잡는 exception filter
 * path not found 는 nest 내부적으로 NotFoundException 을 쓰기 떄문에 다른 필터에서 처리
 */
@Catch(HttpNotFoundException)
export class HttpNotFoundExceptionFilter
  implements ExceptionFilter<HttpNotFoundException>
{
  catch(exception: HttpNotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionError = exception.getResponse() as HttpNotFoundException;

    const exceptionResponseDto = new ExceptionResponseDto({
      statusCode: status,
      errorCode: exceptionError.errorCode,
      message: exceptionError.message,
    });

    response.status(status).json(exceptionResponseDto);
  }
}
