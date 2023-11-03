import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpBadRequestException } from '@src/http-exceptions/exceptions/http-bad-request.exception';

describe(HttpBadRequestException.name, () => {
  it('constructor', () => {
    const exception = new HttpBadRequestException({
      errorCode: ERROR_CODE.CODE003,
      message: 'message',
    });

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });

  describe(HttpBadRequestException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpBadRequestException({
        errorCode: ERROR_CODE.CODE003,
        message: 'message',
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE003,
        message: 'message',
      });
    });
  });
});
