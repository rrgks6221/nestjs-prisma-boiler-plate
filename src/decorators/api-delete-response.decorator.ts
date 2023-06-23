import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiResponse } from '@nestjs/swagger';

export const ApiDeleteResponse = (
  status: Exclude<HttpStatus, ErrorHttpStatusCode>,
) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        properties: {
          count: {
            type: 'number',
            format: 'integer',
            description: '삭제된 리소스 개수',
          },
        },
      },
    }),
  );
};
