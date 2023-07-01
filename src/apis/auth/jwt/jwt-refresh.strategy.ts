import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { BCRYPT_TOKEN } from '@src/constants/token.constant';
import { ENV_KEY } from '@src/core/app-config/constants/api-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { HttpExceptionHelper } from '@src/core/http-exception-filters/helpers/http-exception.helper';
import { PrismaService } from '@src/core/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    appConfigService: AppConfigService,
    private readonly prismaService: PrismaService,
    @Inject(BCRYPT_TOKEN)
    private readonly encryption: typeof bcrypt,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: appConfigService.get<string>(
        ENV_KEY.JWT_REFRESH_TOKEN_SECRET,
      ),
    });
  }

  async validate(payload: any) {
    const existUser: UserEntity | null =
      await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
      });

    if (!existUser) {
      throw new UnauthorizedException(
        HttpExceptionHelper.createError({
          code: ERROR_CODE.CODE004,
          message: 'this token is invalid',
        }),
      );
    }

    return new UserEntity(existUser);
  }

  private static extractJWT(req: Request): string | null {
    const refreshToken = req.cookies?.refresh_token;
    console.log(refreshToken);

    if (!refreshToken) {
      return null;
    }

    return refreshToken;
  }
}
