import { ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ERROR_REASON } from '@src/constants/error-response-reason.constant';
import { HttpPathNotFoundExceptionFilter } from '@src/http-exceptions/filters/http-path-not-found-exception.filter';
import { HttpExceptionService } from '@src/http-exceptions/services/http-exception.service';
import {
  mockHttpArgumentHost,
  mockRequest,
  mockResponse,
} from '@test/mock/mock';
import { MockHttpExceptionService } from '@test/mock/services.mock';

describe(HttpPathNotFoundExceptionFilter.name, () => {
  let filter: HttpPathNotFoundExceptionFilter;
  let mockHttpExceptionService: MockHttpExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpPathNotFoundExceptionFilter,
        {
          provide: HttpExceptionService,
          useClass: MockHttpExceptionService,
        },
      ],
    }).compile();

    filter = module.get<HttpPathNotFoundExceptionFilter>(
      HttpPathNotFoundExceptionFilter,
    );
    mockHttpExceptionService = module.get(HttpExceptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe(HttpPathNotFoundExceptionFilter.prototype.catch.name, () => {
    let exception: NotFoundException;
    let host: ArgumentsHost;

    beforeEach(() => {
      host = mockHttpArgumentHost;

      jest.spyOn(mockResponse, 'status');
    });

    it('exception response', () => {
      exception = new NotFoundException();

      mockRequest.method = 'GET';
      mockRequest.path = 'path';

      const responseJson = {
        errorCode: ERROR_CODE.CODE002,
        reason: ERROR_REASON[ERROR_CODE.CODE005],
        message: 'GET path not found',
      };

      mockHttpExceptionService.buildResponseJson.mockReturnValue(responseJson);

      expect(filter.catch(exception, host)).toBeUndefined();

      expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toBeCalledWith(responseJson);
    });
  });
});
