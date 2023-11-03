import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpNotFoundException } from '@src/http-exceptions/exceptions/http-not-found.exception';

describe(HttpNotFoundException.name, () => {
  it('constructor', () => {
    const exception = new HttpNotFoundException({
      errorCode: ERROR_CODE.CODE002,
      message: 'message',
    });

    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
  });

  describe(HttpNotFoundException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpNotFoundException({
        errorCode: ERROR_CODE.CODE002,
        message: 'message',
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE002,
        message: 'message',
      });
    });
  });
});
