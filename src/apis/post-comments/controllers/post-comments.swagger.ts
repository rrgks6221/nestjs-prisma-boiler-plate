import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';
import { PostCommentsController } from '@src/apis/post-comments/controllers/post-comments.controller';
import { PostCommentResponseDto } from '@src/apis/post-comments/dto/post-comment-response.dto';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { ApiFailureResponse } from '@src/decorators/swagger/api-failure-response.decorator';
import { DeleteResponseDto } from '@src/interceptors/success-interceptor/dto/delete-response.dto';
import { DetailResponseDto } from '@src/interceptors/success-interceptor/dto/detail-response.dto';
import { PaginationResponseDto } from '@src/interceptors/success-interceptor/dto/pagination-response.dto';
import { ApiOperator } from '@src/types/type';

export const ApiPostComments: ApiOperator<keyof PostCommentsController> = {
  FindAllAndCount: (
    apiOperationOptions: ApiOperationOptions,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      PaginationResponseDto.swaggerBuilder(
        HttpStatus.OK,
        'postComments',
        PostCommentResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
  FindOne: (apiOperationOptions: ApiOperationOptions): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(
        HttpStatus.OK,
        'postComment',
        PostCommentResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
  Create: (apiOperationOptions: ApiOperationOptions): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(
        HttpStatus.CREATED,
        'postComment',
        PostCommentResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
  PutUpdate: (apiOperationOptions: ApiOperationOptions): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(
        HttpStatus.OK,
        'postComment',
        PostCommentResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
  PatchUpdate: (
    apiOperationOptions: ApiOperationOptions,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DetailResponseDto.swaggerBuilder(
        HttpStatus.OK,
        'postComment',
        PostCommentResponseDto,
      ),
      ApiFailureResponse(HttpStatus.BAD_REQUEST, [ERROR_CODE.CODE003]),
      ApiFailureResponse(HttpStatus.UNAUTHORIZED, [ERROR_CODE.CODE004]),
      ApiFailureResponse(HttpStatus.FORBIDDEN, [ERROR_CODE.CODE006]),
      ApiFailureResponse(HttpStatus.NOT_FOUND, [ERROR_CODE.CODE005]),
      ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        ERROR_CODE.CODE001,
      ]),
    );
  },
  Remove: (apiOperationOptions: ApiOperationOptions): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      DeleteResponseDto.swaggerBuilder(HttpStatus.OK, 'postComment'),
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
