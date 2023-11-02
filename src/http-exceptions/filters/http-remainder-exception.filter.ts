import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';
import { HttpInternalServerErrorException } from '@src/http-exceptions/exceptions/http-internal-server-error.exception';
import { Response } from 'express';

/**
 * 다른 exception filter 가 잡지않는 exception 을 잡는 필터
 * 내부적으로 만들어지지 않은 exception 을 사용했기때문에 server error 처리
 */
@Catch(HttpException)
export class HttpRemainderExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly appConfigService: AppConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionError = new HttpInternalServerErrorException({
      errorCode: ERROR_CODE.CODE001,
      message: 'server error',
    });

    const isProduction = this.appConfigService.isProduction();
    const exceptionResponseDto = new ExceptionResponseDto({
      statusCode: exceptionError.statusCode,
      errorCode: exceptionError.errorCode,
      message: exceptionError.message,
      stack: isProduction ? undefined : exception.stack,
    });

    response.status(status).json(exceptionResponseDto);
  }
}
