import { INestApplication } from '@nestjs/common';
import { LoginType } from '@prisma/client';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import request from 'supertest';

export const testingLogin = async (app: INestApplication) => {
  const user = {
    loginType: LoginType.EMAIL,
    password: 'password',
    email: `${Math.random() + new Date().getMilliseconds()}@email.com`,
    nickname: String(Math.random() + new Date().getMilliseconds()),
  };

  const userPath = '/api/v1/users';

  const userResponse = await request(app.getHttpServer())
    .post(userPath)
    .send(user);

  const signInPath = '/api/v1/auth/sign-in';

  const signInResponse = await request(app.getHttpServer())
    .post(signInPath)
    .send({
      email: user.email,
      password: user.password,
    });

  return {
    user: userResponse.body.user as UserResponseDto,
    cookies: signInResponse.headers['set-cookie'] as string[],
  };
};
