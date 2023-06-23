import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiBaseResponse = (
  status: Exclude<HttpStatus, ErrorHttpStatusCode>,
  res: {
    key: string;
    type: Type;
  },
) => {
  const { key, type } = res;

  return applyDecorators(
    HttpCode(status),
    ApiExtraModels(type),
    ApiResponse({
      schema: {
        properties: {
          [key]: {
            type: 'object',
            $ref: getSchemaPath(type),
          },
        },
      },
    }),
  );
};
