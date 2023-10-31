import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PostResponseDto } from '@src/apis/posts/dto/post-response.dto';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiFailureResponse } from '@src/decorators/swagger/api-failure-response.decorator';
import { BaseResponseDto } from '@src/interceptors/success-interceptor/dto/base-response.dto';
import { DeleteResponseDto } from '@src/interceptors/success-interceptor/dto/delete-response.dto';
import { PaginationResponseDto } from '@src/interceptors/success-interceptor/dto/pagination-response.dto';

export const ApiFindAllAndCount = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    PaginationResponseDto.swaggerBuilder(
      HttpStatus.OK,
      'posts',
      PostResponseDto,
    ),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiFindOne = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.OK, 'post', PostResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiCreate = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.CREATED, 'post', PostResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiPutUpdate = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.OK, 'post', PostResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiPatchUpdate = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    BaseResponseDto.swaggerBuilder(HttpStatus.OK, 'post', PostResponseDto),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiRemove = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    DeleteResponseDto.swaggerBuilder(HttpStatus.OK, 'post'),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};
