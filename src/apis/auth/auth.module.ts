import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@src/apis/auth/controllers/auth.controller';
import { AuthHelper } from '@src/apis/auth/helpers/auth.helper';
import { JwtModuleOption } from '@src/apis/auth/jwt/jwt-module.option';
import { JwtRefreshStrategy } from '@src/apis/auth/jwt/jwt-refresh.strategy';
import { JwtStrategy } from '@src/apis/auth/jwt/jwt.strategy';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { UsersModule } from '@src/apis/users/users.module';
import { BCRYPT_TOKEN } from '@src/constants/token.constant';
import { AppCacheModule } from '@src/core/app-cache/app-cache.module';
import { UseDevelopmentMiddleware } from '@src/middlewares/use-development.middleware';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    AppCacheModule,
    JwtModule.registerAsync({
      useClass: JwtModuleOption,
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthHelper,
    {
      provide: BCRYPT_TOKEN,
      useValue: bcrypt,
    },
  ],
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
