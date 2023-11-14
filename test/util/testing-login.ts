import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { LoginType } from '@prisma/client';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import request from 'supertest';

export const testingLogin = async (app: INestApplication) => {
  const user = {
    loginType: LoginType.EMAIL,
    password: 'password',
    email: faker.name.firstName() + 'e2etesting@email.com',
    nickname: faker.name.firstName() + 'e2testing',
  };
  const userResponse = await request(app.getHttpServer())
    .post('/api/v1/users')
    .send(user);

  const signInResponse = await request(app.getHttpServer())
    .post('/api/v1/auth/sign-in')
    .send({
      email: user.email,
      password: user.password,
    });

  return {
    user: signInResponse.body.user as UserResponseDto,
    cookies: signInResponse.headers['set-cookie'] as string[],
  };
};
