import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';
import { HttpBadRequestException } from '@src/http-exceptions/exceptions/http-bad-request.exception';
import { HttpBadRequestExceptionFilter } from '@src/http-exceptions/filters/http-bad-request-exception.filter';
import { HttpExceptionService } from '@src/http-exceptions/services/http-exception.service';
import { mockHttpArgumentHost, mockResponse } from '@test/mock/mock';
import { MockHttpExceptionService } from '@test/mock/services.mock';

describe(HttpBadRequestExceptionFilter.name, () => {
  let filter: HttpBadRequestExceptionFilter;
  let mockHttpExceptionService: MockHttpExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpBadRequestExceptionFilter,
        {
          provide: HttpExceptionService,
          useClass: MockHttpExceptionService,
        },
      ],
    }).compile();

    filter = module.get<HttpBadRequestExceptionFilter>(
      HttpBadRequestExceptionFilter,
    );
    mockHttpExceptionService = module.get(HttpExceptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe(HttpBadRequestExceptionFilter.prototype.catch.name, () => {
    let exception: HttpBadRequestException;
    let host: ArgumentsHost;

    beforeEach(() => {
      host = mockHttpArgumentHost;

      jest.spyOn(mockResponse, 'status');
    });

    it('exception response', () => {
      exception = new HttpBadRequestException({
        errorCode: ERROR_CODE.CODE003,
        message: 'message',
      });

      const responseJson = {
        ...exception,
        reason: ERROR_REASON[exception.errorCode],
      };

      mockHttpExceptionService.buildResponseJson.mockReturnValue(responseJson);

      expect(filter.catch(exception, host)).toBeUndefined();

      expect(mockResponse.status).toBeCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toBeCalledWith(responseJson);
    });
  });
});
