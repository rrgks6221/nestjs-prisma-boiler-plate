import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PostBaseResponseDto } from '@src/apis/posts/dto/post-base-response.dto';
import { PostEntity } from '@src/apis/posts/entities/post.entity';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiBaseResponse } from '@src/decorators/api-base-response.decorator';
import { ApiDeleteResponse } from '@src/decorators/api-delete-response.decorator';
import { ApiFailureResponse } from '@src/decorators/api-failure-response.decorator';
import { ApiPaginationResponse } from '@src/decorators/api-pagination-response.decorator';

export const ApiFindAllAndCount = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiPaginationResponse(HttpStatus.OK, {
      key: 'posts',
      type: PostEntity,
    }),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiFindOne = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.OK, {
      key: 'post',
      type: PostBaseResponseDto,
    }),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiCreate = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.OK, {
      key: 'post',
      type: PostBaseResponseDto,
    }),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};

export const ApiPutUpdate = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBaseResponse(HttpStatus.OK, {
      key: 'post',
      type: PostBaseResponseDto,
    }),
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
    ApiBaseResponse(HttpStatus.OK, {
      key: 'post',
      type: PostBaseResponseDto,
    }),
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
    ApiDeleteResponse(HttpStatus.OK),
    ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
    ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
    ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
    ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [ERROR_CODE.CODE001]),
  );
};
