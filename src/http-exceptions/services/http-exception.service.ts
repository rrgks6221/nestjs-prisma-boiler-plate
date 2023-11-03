import { Injectable } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { ExceptionResponseDto } from '@src/http-exceptions/dto/exception-response.dto';

interface ExceptionError {
  errorCode: typeof ERROR_CODE[keyof typeof ERROR_CODE];
  message: string;
}
@Injectable()
export class HttpExceptionService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getErrorStack(exception: any) {
    const isProduction = this.appConfigService.isProduction();

    return isProduction ? undefined : exception.stack;
  }

  buildResponseJson(
    statusCode: number,
    exceptionError: ExceptionError,
  ): ExceptionResponseDto {
    const { errorCode, message } = exceptionError;

    return new ExceptionResponseDto({
      statusCode,
      errorCode,
      message,
      stack: statusCode <= 500 ? this.getErrorStack(statusCode) : undefined,
    });
  }
}
