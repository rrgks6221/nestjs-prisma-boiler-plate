import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiFailureResponse } from '@src/decorators/swagger/api-failure-response.decorator';
import { BaseResponseDto } from '@src/interceptors/success-interceptor/dto/base-response.dto';

export const ApiGetProfile = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.OK, 'user', UserResponseDto),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiSignUp = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.CREATED, 'user', UserResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiSignIn = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.CREATED, 'user', UserResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiSignOut = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiNoContentResponse(),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiRefresh = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiNoContentResponse(),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiCreateAccessTokenForDevelop = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiCreatedResponse({
      schema: {
        type: 'string',
      },
    }),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};
