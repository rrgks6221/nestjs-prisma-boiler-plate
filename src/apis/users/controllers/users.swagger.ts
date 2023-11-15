import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';
import { UsersController } from '@src/apis/users/controllers/users.controller';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiFailureResponse } from '@src/decorators/swagger/api-failure-response.decorator';
import { DeleteResponseDto } from '@src/interceptors/success-interceptor/dto/delete-response.dto';
import { DetailResponseDto } from '@src/interceptors/success-interceptor/dto/detail-response.dto';
import { PaginationResponseDto } from '@src/interceptors/success-interceptor/dto/pagination-response.dto';
import { ApiOperator } from '@src/types/type';

export const ApiUsers: ApiOperator<keyof UsersController> = {
  FindAllAndCount: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      PaginationResponseDto.swaggerBuilder(
        HttpStatus.OK,
        'users',
        UserResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },

  FindOne: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(HttpStatus.OK, 'user', UserResponseDto),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },

  Create: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(
        HttpStatus.CREATED,
        'user',
        UserResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },

  PatchUpdate: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(HttpStatus.OK, 'user', UserResponseDto),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },

  PutUpdate: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(HttpStatus.OK, 'user', UserResponseDto),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },

  Remove: (apiOperationOptions: ApiOperationOptions) => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DeleteResponseDto.swaggerBuilder(HttpStatus.OK, 'user'),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
};
