import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginType } from '@prisma/client';
import { SignInDto } from '@src/apis/auth/dtos/sign-in.dto';
import { AuthToken } from '@src/apis/auth/types/auth.type';
import { CreateUserRequestBodyDto } from '@src/apis/users/dto/create-user-request-body.dto';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { UsersService } from '@src/apis/users/services/users.service';
import { BCRYPT_TOKEN } from '@src/constants/token.constant';
import { ENV_KEY } from '@src/core/app-config/constants/api-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { PrismaService } from '@src/core/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    @Inject(BCRYPT_TOKEN)
    private readonly encryption: typeof bcrypt,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async signUp(
    createUserRequestBodyDto: CreateUserRequestBodyDto,
  ): Promise<UserEntity> {
    createUserRequestBodyDto.password = await this.encryption.hash(
      createUserRequestBodyDto.password,
      10,
    );
    const newUser = await this.prismaService.user.create({
      data: createUserRequestBodyDto,
    });

    return new UserEntity(newUser);
  }

  async signIn(signInDto: SignInDto): Promise<UserEntity> {
    const existUser = await this.prismaService.user.findFirst({
      where: {
        email: signInDto.email,
        loginType: LoginType.EMAIL,
      },
    });

    if (!existUser) {
      throw new UnauthorizedException();
    }

    if (!existUser.password) {
      throw new InternalServerErrorException();
    }

    const isComparePassword = await this.encryption.compare(
      signInDto.password,
      existUser.password,
    );

    if (!isComparePassword) {
      throw new ForbiddenException('isComparePassword');
    }

    return existUser;
  }

  createAccessToken(id: number): string {
    const payload = { id };

    return this.jwtService.sign(payload);
  }

  generateAccessToken(id: number): Promise<string> {
    return this.jwtService.signAsync(
      {
        id,
      },
      {
        secret: this.appConfigService.get<string>(
          ENV_KEY.JWT_ACCESS_TOKEN_SECRET,
        ),
        expiresIn: Math.floor(
          this.appConfigService.get<number>(
            ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION_MS,
          ) / 1000,
        ),
      },
    );
  }

  generateRefreshToken(id: number): Promise<string> {
    return this.jwtService.signAsync(
      {
        id,
      },
      {
        secret: this.appConfigService.get<string>(
          ENV_KEY.JWT_REFRESH_TOKEN_SECRET,
        ),
        expiresIn: Math.floor(
          this.appConfigService.get<number>(
            ENV_KEY.JWT_REFRESH_TOKEN_EXPIRATION_MS,
          ),
        ),
      },
    );
  }

  async setAuthToken(
    res: Response,
    userId: number,
    authToken: AuthToken,
  ): Promise<void> {
    const { accessToken, refreshToken } = authToken;

    res.cookie('access_token', accessToken);
    res.cookie('refresh_token', refreshToken);

    await this.cacheManager.set(
      this.getRefreshKeyInStore(userId),
      refreshToken,
      {
        ttl:
          this.appConfigService.get<number>(
            ENV_KEY.JWT_REFRESH_TOKEN_EXPIRATION_MS,
          ) / 1000,
      },
    );
  }

  async clearAuthToken(res: Response, userId: number): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    await this.cacheManager.del(this.getRefreshKeyInStore(userId));
  }

  private getRefreshKeyInStore(userId: number): string {
    return 'refreshUserId' + ':' + String(userId);
  }
}
