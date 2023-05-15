import { Module } from '@nestjs/common';
import { HttpBadRequestExceptionFilter } from '@src/core/exception/filters/http-bad-request-exception.filter';
import { HttpNotFoundExceptionFilter } from '@src/core/exception/filters/http-not-found-exception.filter';
import { HttpNodeInternalServerErrorExceptionFilter } from '@src/core/exception/filters/http-node-internal-server-error-exception.filter';
import { HttpNestInternalServerErrorExceptionFilter } from '@src/core/exception/filters/http-nest-Internal-server-error-exception.filter';
import { HttpRemainderExceptionFilter } from '@src/core/exception/filters/http-remainder-exception.filter';

@Module({
  providers: [
    HttpBadRequestExceptionFilter,
    HttpNotFoundExceptionFilter,
    HttpNestInternalServerErrorExceptionFilter,
    HttpNodeInternalServerErrorExceptionFilter,
    HttpRemainderExceptionFilter,
  ],
})
export class ExceptionFilterModule {}
