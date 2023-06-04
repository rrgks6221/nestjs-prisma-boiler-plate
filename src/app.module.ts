import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { apiModules } from '@src/apis';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { CoreModule } from '@src/core/core.module';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';

@Module({
  imports: [CoreModule, ...apiModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
