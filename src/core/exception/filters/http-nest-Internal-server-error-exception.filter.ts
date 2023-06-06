import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { HttpExceptionHelper } from '@src/core/exception/helpers/http-exception.helper';
import {
  ExceptionError,
  ResponseJson,
} from '@src/core/exception/types/exception.type';
import { Response } from 'express';

/**
 * nestJS 메서드를 이용한 500번 에러 를 잡는 exception filter
 * ex) throw new InternalServerErrorException()
 */
@Catch(InternalServerErrorException)
export class HttpNestInternalServerErrorExceptionFilter
  extends HttpExceptionHelper
  implements ExceptionFilter<InternalServerErrorException>
{
  constructor(private readonly appConfigService: AppConfigService) {
    super();
  }

  catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionError = exception.getResponse() as ExceptionError;

    const isProduction = this.appConfigService.isProduction();

    const responseJson: ResponseJson = this.buildResponseJson(
      status,
      exceptionError,
    );
    responseJson.stack = isProduction ? undefined : exception.stack;

    response.status(status).json(responseJson);
  }
}
