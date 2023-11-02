import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';
import { HttpInternalServerErrorException } from '@src/http-exceptions/exceptions/http-internal-server-error.exception';
import { Response } from 'express';

/**
 * nestJS 메서드를 이용한 500번 에러 를 잡는 exception filter
 * ex) throw new InternalServerErrorException()
 */
@Catch(HttpInternalServerErrorException)
export class HttpNestInternalServerErrorExceptionFilter
  implements ExceptionFilter<HttpInternalServerErrorException>
{
  constructor(private readonly appConfigService: AppConfigService) {}

  catch(
    exception: HttpInternalServerErrorException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionError =
      exception.getResponse() as HttpInternalServerErrorException;

    const isProduction = this.appConfigService.isProduction();
    const exceptionResponseDto = new ExceptionResponseDto({
      statusCode: status,
      errorCode: exceptionError.errorCode,
      message: exceptionError.message,
      stack: isProduction ? undefined : exception.stack,
    });

    response.status(status).json(exceptionResponseDto);
  }
}
