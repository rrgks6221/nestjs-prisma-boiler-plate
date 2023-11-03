import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpUnauthorizedException } from '@src/http-exceptions/exceptions/http-unauthorized.exception';

describe(HttpUnauthorizedException.name, () => {
  it('constructor', () => {
    const exception = new HttpUnauthorizedException({
      errorCode: ERROR_CODE.CODE004,
      message: 'message',
    });

    expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
  });

  describe(HttpUnauthorizedException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpUnauthorizedException({
        errorCode: ERROR_CODE.CODE004,
        message: 'message',
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE004,
        message: 'message',
      });
    });
  });
});
