import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@src/apis/auth/controllers/auth.controller';
import { JwtStrategy } from '@src/apis/auth/jwt/jwt.strategy';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { ENV_KEY } from '@src/core/app-config/constants/api-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { UseDevelopmentMiddleware } from '@src/middlewares/use-development.middleware';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
          signOptions: {
            expiresIn: '10y',
          },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UseDevelopmentMiddleware).forRoutes({
      path: 'api/auth/access-token/:id',
      method: RequestMethod.POST,
    });
  }
}
