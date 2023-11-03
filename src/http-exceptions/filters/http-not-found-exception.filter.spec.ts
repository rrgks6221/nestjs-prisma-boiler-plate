import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';
import { HttpNotFoundException } from '@src/http-exceptions/exceptions/http-not-found.exception';
import { HttpNotFoundExceptionFilter } from '@src/http-exceptions/filters/http-not-found-exception.filter';

import { HttpExceptionService } from '@src/http-exceptions/services/http-exception.service';
import { mockHttpArgumentHost, mockResponse } from '@test/mock/mock';
import { MockHttpExceptionService } from '@test/mock/services.mock';

describe(HttpNotFoundExceptionFilter.name, () => {
  let filter: HttpNotFoundExceptionFilter;
  let mockHttpExceptionService: MockHttpExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpNotFoundExceptionFilter,
        {
          provide: HttpExceptionService,
          useClass: MockHttpExceptionService,
        },
      ],
    }).compile();

    filter = module.get<HttpNotFoundExceptionFilter>(
      HttpNotFoundExceptionFilter,
    );
    mockHttpExceptionService = module.get(HttpExceptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe(HttpNotFoundExceptionFilter.prototype.catch.name, () => {
    let exception: HttpNotFoundException;
    let host: ArgumentsHost;

    beforeEach(() => {
      host = mockHttpArgumentHost;

      jest.spyOn(mockResponse, 'status');
    });

    it('exception response', () => {
      exception = new HttpNotFoundException({
        errorCode: ERROR_CODE.CODE005,
        message: 'message',
      });

      const responseJson = {
        ...exception,
        reason: ERROR_REASON[exception.errorCode],
      };

      mockHttpExceptionService.buildResponseJson.mockReturnValue(responseJson);

      expect(filter.catch(exception, host)).toBeUndefined();

      expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toBeCalledWith(responseJson);
    });
  });
});
