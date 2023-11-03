import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { HttpProcessErrorException } from '@src/http-exceptions/exceptions/http-process-error.exception';

describe(HttpProcessErrorException.name, () => {
  describe(HttpProcessErrorException.prototype.getResponse.name, () => {
    it('get exception response', () => {
      const exception = new HttpProcessErrorException({
        errorCode: ERROR_CODE.CODE001,
      });

      expect(exception.getResponse()).toEqual({
        errorCode: ERROR_CODE.CODE001,
        message: 'server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    });
  });
});
