import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiBaseResponse } from '@src/decorators/swagger/api-base-response.decorator';
import { ApiFailureResponse } from '@src/decorators/swagger/api-failure-response.decorator';

export const ApiGetProfile = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.OK, { key: 'user', type: UserEntity }),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiSignUp = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.CREATED, { key: 'user', type: UserEntity }),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiSignIn = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.CREATED, { key: 'user', type: UserEntity }),
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
