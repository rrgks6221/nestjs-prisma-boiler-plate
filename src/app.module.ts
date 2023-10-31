import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModules } from '@src/apis/api.module';
import { CoreModule } from '@src/core/core.module';
import { SuccessInterceptorModule } from '@src/interceptors/success-interceptor/success-interceptor.module';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';

@Module({
  imports: [CoreModule, ApiModules, SuccessInterceptorModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
