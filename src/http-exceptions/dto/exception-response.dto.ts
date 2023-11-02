import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';

export class ExceptionResponseDto {
  public readonly timestamp: Date;

  public readonly statusCode: ErrorHttpStatusCode;

  public readonly errorCode: typeof ERROR_CODE[keyof typeof ERROR_CODE];

  public readonly reason: typeof ERROR_REASON[keyof typeof ERROR_REASON];

  public readonly message: string;

  public readonly stack?: any;

  constructor(error: Omit<ExceptionResponseDto, 'timestamp' | 'reason'>) {
    const { statusCode, errorCode, message, stack } = error;

    this.timestamp = new Date();
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.reason = ERROR_REASON[errorCode];
    this.message = message;
    this.stack = stack;
  }
}
