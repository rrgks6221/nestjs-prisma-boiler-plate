import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetProfile,
  ApiRefresh,
  ApiSetAccessTokenForDevelop,
  ApiSignIn,
  ApiSignOut,
} from '@src/apis/auth/controllers/auth.swagger';
import { SignInDtoRequestBody } from '@src/apis/auth/dtos/sign-in-request-body.dto';
import { JwtAuthGuard } from '@src/apis/auth/guards/jwt-auth.guard';
import { RefreshAuthGuard } from '@src/apis/auth/guards/refresh-auth-guard.guard';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { ApiVersion } from '@src/constants/enum';
import {
  ResponseType,
  SetResponse,
} from '@src/decorators/set-response.decorator';
import { User } from '@src/decorators/user.decorator';
import { ParsePositiveIntPipe } from '@src/pipes/parse-positive-int.pipe';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version(ApiVersion.One)
  @ApiGetProfile('로그인한 유저 프로필')
  @UseGuards(JwtAuthGuard)
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return new UserResponseDto(user);
  }

  @Version(ApiVersion.One)
  @ApiSignIn('로그인')
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDtoRequestBody: SignInDtoRequestBody,
  ): Promise<UserResponseDto> {
    const user = await this.authService.signIn(signInDtoRequestBody);
    const accessToken = await this.authService.generateAccessToken(user.id);
    const refreshToken = await this.authService.generateRefreshToken(user.id);

    await this.authService.setAuthToken(res, user.id, {
      accessToken,
      refreshToken,
    });

    return new UserResponseDto(user);
  }

  @Version(ApiVersion.One)
  @ApiSignOut('로그아웃')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  async signOut(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.authService.clearAuthToken(res, user.id);
  }

  @Version(ApiVersion.One)
  @ApiRefresh('refresh token 을 이용한 access token 재발급')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserEntity,
  ): Promise<void> {
    const accessToken = await this.authService.generateAccessToken(user.id);
    const refreshToken = await this.authService.generateRefreshToken(user.id);

    await this.authService.setAuthToken(res, user.id, {
      accessToken,
      refreshToken,
    });
  }

  @Version(ApiVersion.One)
  @ApiSetAccessTokenForDevelop('개발용으로 생성된 access token 발급 api')
  @Post('set-token/:userId')
  async setAccessTokenForDevelop(
    @Res({ passthrough: true }) res: Response,
    @Param('userId', ParsePositiveIntPipe) userId: number,
  ): Promise<string> {
    const accessToken = await this.authService.generateAccessToken(userId);
    const refreshToken = await this.authService.generateRefreshToken(userId);

    await this.authService.setAuthToken(res, userId, {
      accessToken,
      refreshToken,
    });

    return this.authService.generateAccessToken(userId);
  }
}
