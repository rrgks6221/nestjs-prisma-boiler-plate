import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpInternalServerErrorException } from '@src/http-exceptions/exceptions/http-internal-server-error.exception';

describe(HttpInternalServerErrorException.name, () => {
  it('constructor', () => {
    const exception = new HttpInternalServerErrorException({
      errorCode: ERROR_CODE.CODE001,
      log: 'log',
    });

    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  describe(HttpInternalServerErrorException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpInternalServerErrorException({
        errorCode: ERROR_CODE.CODE001,
        log: 'log',
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE001,
        message: 'server error',
      });
    });
  });
});
