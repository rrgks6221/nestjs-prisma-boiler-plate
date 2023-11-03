import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpForbiddenException } from '@src/http-exceptions/exceptions/http-forbidden.exception';

describe(HttpForbiddenException.name, () => {
  it('constructor', () => {
    const exception = new HttpForbiddenException({
      errorCode: ERROR_CODE.CODE006,
      message: 'message',
    });

    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
  });

  describe(HttpForbiddenException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpForbiddenException({
        errorCode: ERROR_CODE.CODE006,
        message: 'message',
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE006,
        message: 'message',
      });
    });
  });
});
