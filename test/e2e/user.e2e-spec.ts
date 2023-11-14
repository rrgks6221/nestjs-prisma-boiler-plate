import { HttpStatus, INestApplication } from '@nestjs/common';
import { LoginType } from '@prisma/client';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { UsersModule } from '@src/apis/users/users.module';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { createTestingApp } from '@test/util/create-testing-app';
import { testingLogin } from '@test/util/testing-login';
import request from 'supertest';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let basePath: string;

  let testingUser: UserEntity;

  let testingCookies: string[];

  beforeAll(async () => {
    app = await createTestingApp(UsersModule);

    await app.init();

    prismaService = app.get(PrismaService);

    const { user, cookies } = await testingLogin(app);

    testingUser = user;
    testingCookies = cookies;
  });

  beforeEach(() => {
    basePath = '/api/v1/users';
  });

  afterAll(async () => {
    console.log(testingUser);
    await prismaService.user.delete({
      where: {
        id: testingUser.id,
      },
    });
  });

  describe('/api/v1/users (GET)', () => {
    it('default options findAllAndCount', async () => {
      const result = await request(app.getHttpServer()).get(basePath);

      const { statusCode, body } = result;
      const {
        totalCount,
        pageSize,
        currentPage,
        nextPage,
        hasNext,
        lastPage,
        users,
      } = body;
      const user = users[0];
      const { id, loginType, email, nickname } = user;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(totalCount).toBeGreaterThanOrEqual(1);
      expect(pageSize).toBeGreaterThanOrEqual(1);
      expect(currentPage).toBeGreaterThanOrEqual(1);
      expect(nextPage).toBeInteger({ nullable: true });
      expect(hasNext).toBeBoolean();
      expect(lastPage).toBeGreaterThanOrEqual(1);

      expect(users.length).toBeLessThanOrEqual(20);
      expect(id).toBeInteger();
      expect(loginType).toBeString();
      expect(email).toBeString();
      expect(nickname).toBeString();
    });
  });

  describe('/api/v1/users/:userId (GET)', () => {
    it('not found user', async () => {
      basePath += '/' + '999999999';

      const result = await request(app.getHttpServer()).get(basePath);
      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('user detail response', async () => {
      basePath += '/' + testingUser.id;

      const result = await request(app.getHttpServer()).get(basePath);
      const { statusCode, body } = result;
      const { user } = body;
      const { id, loginType, email, nickname } = user;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(loginType).toBeString();
      expect(email).toBeString();
      expect(nickname).toBeString();
    });
  });

  describe('/api/v1/users (POST)', () => {
    it('create user', async () => {
      const result = await request(app.getHttpServer()).post(basePath).send({
        loginType: LoginType.EMAIL,
        password: 'password',
        email: 'usere2etestcreate@test.com',
        nickname: 'usere2etestcreate',
      });

      const { statusCode, body } = result;
      const { user } = body;
      const { id, loginType, email, nickname } = user;

      expect(statusCode).toBe(HttpStatus.CREATED);

      expect(id).toBeInteger();
      expect(loginType).toBeString();
      expect(email).toBeString();
      expect(nickname).toBeString();

      await prismaService.user.delete({ where: { id } });
    });
  });

  describe('/api/v1/users/:userId (PATCH)', () => {
    it('not found user response 404', async () => {
      basePath += '/' + testingUser.id + 1;

      const result = await request(app.getHttpServer())
        .patch(basePath)
        .send({
          nickname: 'edite2etesting',
        })
        .set('Cookie', testingCookies);
      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('update nickname', async () => {
      basePath += '/' + testingUser.id;

      const result = await request(app.getHttpServer())
        .patch(basePath)
        .send({
          nickname: 'edite2etesting',
        })
        .set('Cookie', testingCookies);
      const { statusCode, body } = result;
      const { user } = body;
      const { id, loginType, email, nickname } = user;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(loginType).toBeString();
      expect(email).toBeString();
      expect(nickname).toBeString();
    });
  });

  describe('/api/v1/users/:userId (PUT)', () => {
    it('partial update response 400', async () => {
      basePath += '/' + testingUser.id;

      const result = await request(app.getHttpServer())
        .put(basePath)
        .send({
          nickname: 'edite2etesting',
        })
        .set('Cookie', testingCookies);
      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(errorCode).toBe(ERROR_CODE.CODE003);
    });

    it('not found user response 404', async () => {
      basePath += '/' + testingUser.id + 1;

      const result = await request(app.getHttpServer())
        .put(basePath)
        .send({
          nickname: 'edite2etesting',
          email: 'edite2etesting@email.com',
        })
        .set('Cookie', testingCookies);
      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('update userInfo', async () => {
      basePath += '/' + testingUser.id;

      const result = await request(app.getHttpServer())
        .put(basePath)
        .send({
          email: 'edite2etesting@email.com',
          nickname: 'edite2etesting',
        })
        .set('Cookie', testingCookies);
      const { statusCode, body } = result;
      const { user } = body;
      const { id, loginType, email, nickname } = user;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(loginType).toBeString();
      expect(email).toBeString();
      expect(nickname).toBeString();
    });
  });

  describe('/api/v1/users/:userId (DELETE)', () => {
    it('not found user response 404', async () => {
      basePath += '/' + testingUser.id + 1;

      const result = await request(app.getHttpServer())
        .delete(basePath)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('delete user', async () => {
      basePath += '/' + testingUser.id;

      const result = await request(app.getHttpServer())
        .delete(basePath)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toMatchObject({ count: 1 });
    });
  });
});
