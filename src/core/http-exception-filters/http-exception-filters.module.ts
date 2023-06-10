import { Module } from '@nestjs/common';
import { HttpBadRequestExceptionFilter } from '@src/core/http-exception-filters/filters/http-bad-request-exception.filter';
import { HttpNestInternalServerErrorExceptionFilter } from '@src/core/http-exception-filters/filters/http-nest-Internal-server-error-exception.filter';
import { HttpNodeInternalServerErrorExceptionFilter } from '@src/core/http-exception-filters/filters/http-node-internal-server-error-exception.filter';
import { HttpNotFoundExceptionFilter } from '@src/core/http-exception-filters/filters/http-not-found-exception.filter';
import { HttpRemainderExceptionFilter } from '@src/core/http-exception-filters/filters/http-remainder-exception.filter';

@Module({
  providers: [
    HttpBadRequestExceptionFilter,
    HttpNotFoundExceptionFilter,
    HttpNestInternalServerErrorExceptionFilter,
    HttpNodeInternalServerErrorExceptionFilter,
    HttpRemainderExceptionFilter,
  ],
})
export class HttpExceptionFiltersModule {}
