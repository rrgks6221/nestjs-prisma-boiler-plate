import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@src/apis/auth/services/auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '개발용으로 생성된 엑세스 토큰 생성 api' })
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Post('access-token/:id')
  createAccessTokenForDevelop(@Body('id') id: number) {
    return this.authService.createAccessToken(id);
  }
}
