import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginationResponse = (
  status: Exclude<HttpStatus, ErrorHttpStatusCode>,
  res: {
    key: string;
    type: Type;
  },
) => {
  const { key, type } = res;

  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status,
      schema: {
        properties: {
          totalCount: {
            type: 'number',
            format: 'integer',
            description: '총 페이지 수',
            minimum: 1,
          },
          pageSize: {
            type: 'number',
            format: 'integer',
            description: '한 요청에 대한 data 수',
            minimum: 1,
          },
          currentPage: {
            type: 'number',
            format: 'integer',
            description: '현재 페이지 번호',
            minimum: 1,
          },
          nextPage: {
            type: 'number',
            format: 'integer',
            description: '다음 페이지가 없다면 null 이 반환됩니다.',
            minimum: 2,
            nullable: true,
          },
          hasNext: {
            type: 'boolean',
            description: '다음 페이지 존재 유무',
          },
          lastPage: {
            type: 'number',
            format: 'integer',
            description: '마지막 페이지 번호',
            minimum: 1,
          },
          [key]: {
            type: 'array',
            items: {
              type: 'object',
              $ref: getSchemaPath(type),
            },
          },
        },
      },
    }),
  );
};
