import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';
import { apiModules } from '@src/apis';
import { CoreModule } from '@src/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        SECRET_KEY: Joi.string(),
        DATABASE_URL: Joi.string(),
      }),
      isGlobal: true,
    }),
    CoreModule,
    ...apiModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
