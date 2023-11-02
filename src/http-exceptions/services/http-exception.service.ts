import { Injectable } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';
import {
  ExceptionError,
  ResponseJson,
} from '@src/http-exceptions/types/exception.type';

@Injectable()
export class HttpExceptionService {
  buildResponseJson(
    statusCode: number,
    exception: ExceptionError,
  ): ResponseJson {
    const { code, reason, messages } = exception;

    return {
      timestamp: new Date(),
      statusCode,
      reason,
      code,
      messages,
    };
  }

  static createError(error: {
    code: typeof ERROR_CODE[keyof typeof ERROR_CODE];
    message: string;
  }): ExceptionError;

  static createError(error: {
    code: typeof ERROR_CODE[keyof typeof ERROR_CODE];
    messages: string[];
  }): ExceptionError;

  static createError(error: {
    code: typeof ERROR_CODE[keyof typeof ERROR_CODE];
    message: string;
    messages: string[];
  }): ExceptionError {
    const { code, message, messages } = error;

    return {
      code,
      reason: ERROR_REASON[code],
      messages: messages || [message],
    };
  }
}
