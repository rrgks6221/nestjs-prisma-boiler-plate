import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';
import { HttpInternalServerErrorException } from '@src/http-exceptions/exceptions/http-internal-server-error.exception';
import { HttpInternalServerErrorExceptionFilter } from '@src/http-exceptions/filters/http-internal-server-error-exception.filter';
import { HttpExceptionService } from '@src/http-exceptions/services/http-exception.service';
import { mockHttpArgumentHost, mockResponse } from '@test/mock/mock';
import { MockHttpExceptionService } from '@test/mock/services.mock';

describe(HttpInternalServerErrorExceptionFilter.name, () => {
  let filter: HttpInternalServerErrorExceptionFilter;
  let mockHttpExceptionService: MockHttpExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpInternalServerErrorExceptionFilter,
        {
          provide: HttpExceptionService,
          useClass: MockHttpExceptionService,
        },
      ],
    }).compile();

    filter = module.get<HttpInternalServerErrorExceptionFilter>(
      HttpInternalServerErrorExceptionFilter,
    );
    mockHttpExceptionService = module.get(HttpExceptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe(HttpInternalServerErrorExceptionFilter.prototype.catch.name, () => {
    let exception: HttpInternalServerErrorException;
    let host: ArgumentsHost;

    beforeEach(() => {
      host = mockHttpArgumentHost;

      jest.spyOn(mockResponse, 'status');
    });

    it('exception response', () => {
      exception = new HttpInternalServerErrorException({
        errorCode: ERROR_CODE.CODE001,
        log: 'log',
      });

      const responseJson = {
        ...exception,
        reason: ERROR_REASON[exception.errorCode],
      };

      mockHttpExceptionService.buildResponseJson.mockReturnValue(responseJson);

      expect(filter.catch(exception, host)).toBeUndefined();

      expect(mockResponse.status).toBeCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toBeCalledWith(responseJson);
    });
  });
});
