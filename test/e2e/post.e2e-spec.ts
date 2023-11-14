import { HttpStatus, INestApplication } from '@nestjs/common';
import { PostEntity } from '@src/apis/posts/entities/post.entity';
import { PostsModule } from '@src/apis/posts/posts.module';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { ERROR_CODE } from '@src/constants/error-response-code.constant';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { createTestingApp } from '@test/util/create-testing-app';
import { testingLogin } from '@test/util/testing-login';
import request from 'supertest';

describe('PostsController (e2e)', () => {
  const basePath = '/api/v1/posts';
  let app: INestApplication;
  let prismaService: PrismaService;

  let testingUser: UserEntity;

  let testingCookies: string[];

  beforeAll(async () => {
    app = await createTestingApp(PostsModule);

    await app.init();

    prismaService = app.get(PrismaService);

    const { user, cookies } = await testingLogin(app);

    testingUser = user;
    testingCookies = cookies;
  });

  afterAll(async () => {
    await prismaService.post.deleteMany({
      where: {
        userId: testingUser.id,
      },
    });
    await prismaService.user.delete({
      where: {
        id: testingUser.id,
      },
    });
  });

  describe('/api/v1/posts (GET)', () => {
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
        posts,
      } = body;
      const post = posts[0];
      const { id, userId, title, description, hit } = post;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(totalCount).toBeGreaterThanOrEqual(1);
      expect(pageSize).toBeGreaterThanOrEqual(1);
      expect(currentPage).toBeGreaterThanOrEqual(1);
      expect(nextPage).toBeInteger({ nullable: true });
      expect(hasNext).toBeBoolean();
      expect(lastPage).toBeGreaterThanOrEqual(1);

      expect(posts.length).toBeLessThanOrEqual(20);
      expect(id).toBeInteger();
      expect(userId).toBeInteger();
      expect(title).toBeString();
      expect(description).toBeString();
      expect(hit).toBeInteger();
    });
  });

  describe('/api/v1/posts (POST)', () => {
    it('create post', async () => {
      const result = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'title',
          description: 'description',
        })
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { post } = body;
      const { id, userId, title, description, hit } = post;

      expect(statusCode).toBe(HttpStatus.CREATED);

      expect(id).toBeInteger();
      expect(userId).toBeInteger();
      expect(title).toBeString();
      expect(description).toBeString();
      expect(hit).toBe(0);
    });
  });

  describe('/api/v1/posts/:postId (GET)', () => {
    let newPost: PostEntity;

    beforeAll(async () => {
      const post = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'testing post title',
          description: 'testing post description',
        })
        .set('Cookie', testingCookies);

      newPost = post.body.post;
    });

    it('not found post', async () => {
      const result = await request(app.getHttpServer()).get(
        basePath + '/' + newPost.id + 1,
      );

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('find one post', async () => {
      const result = await request(app.getHttpServer()).get(
        basePath + '/' + newPost.id,
      );

      const { statusCode, body } = result;
      const { post } = body;
      const { id, userId, title, description, hit } = post;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(userId).toBeInteger();
      expect(title).toBeString();
      expect(description).toBeString();
      expect(hit).toBeInteger();
    });

    afterAll(async () => {
      await prismaService.post.delete({
        where: {
          id: newPost.id,
        },
      });
    });
  });

  describe('/api/v1/posts/:postId (PUT)', () => {
    let newPost: PostEntity;

    beforeAll(async () => {
      const post = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'testing post title',
          description: 'testing post description',
        })
        .set('Cookie', testingCookies);

      newPost = post.body.post;
    });

    it('not found post', async () => {
      const result = await request(app.getHttpServer())
        .put(basePath + '/' + newPost.id + 1)
        .send({
          title: 'edit testing post title',
          description: 'edit testing post description',
        })
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('not owner post', async () => {
      const loginInfo = await testingLogin(app);

      const user = loginInfo.user;
      const cookies = loginInfo.cookies;

      const result = await request(app.getHttpServer())
        .put(basePath + '/' + newPost.id)
        .send({
          title: 'edit testing post title',
          description: 'edit testing post description',
        })
        .set('Cookie', cookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(errorCode).toBe(ERROR_CODE.CODE006);

      await prismaService.user.delete({
        where: {
          id: user.id,
        },
      });
    });

    it('update post', async () => {
      const editPost = {
        title: 'edit testing post title',
        description: 'edit testing post description',
      };

      const result = await request(app.getHttpServer())
        .put(basePath + '/' + newPost.id)
        .send(editPost)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { post } = body;
      const { id, userId, title, description, hit } = post;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(userId).toBeInteger();
      expect(title).toBe(editPost.title);
      expect(description).toBe(editPost.description);
      expect(hit).toBeInteger();
    });

    afterAll(async () => {
      await prismaService.post.delete({
        where: {
          id: newPost.id,
        },
      });
    });
  });

  describe('/api/v1/posts/:postId (PATCH)', () => {
    let newPost: PostEntity;

    beforeAll(async () => {
      const post = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'testing post title',
          description: 'testing post description',
        })
        .set('Cookie', testingCookies);

      newPost = post.body.post;
    });

    it('not found post', async () => {
      const result = await request(app.getHttpServer())
        .patch(basePath + '/' + newPost.id + 1)
        .send({
          title: 'edit testing post title',
          description: 'edit testing post description',
        })
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('not owner post', async () => {
      const loginInfo = await testingLogin(app);

      const user = loginInfo.user;
      const cookies = loginInfo.cookies;

      const result = await request(app.getHttpServer())
        .patch(basePath + '/' + newPost.id)
        .send({
          title: 'edit testing post title',
          description: 'edit testing post description',
        })
        .set('Cookie', cookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(errorCode).toBe(ERROR_CODE.CODE006);

      await prismaService.user.delete({
        where: {
          id: user.id,
        },
      });
    });

    it('update post', async () => {
      const editPost = {
        title: 'edit testing post title',
      };

      const result = await request(app.getHttpServer())
        .patch(basePath + '/' + newPost.id)
        .send(editPost)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { post } = body;
      const { id, userId, title, description, hit } = post;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(id).toBeInteger();
      expect(userId).toBeInteger();
      expect(title).toBe(editPost.title);
      expect(description).toBe(newPost.description);
      expect(hit).toBeInteger();
    });

    afterAll(async () => {
      await prismaService.post.delete({
        where: {
          id: newPost.id,
        },
      });
    });
  });

  describe('/api/v1/posts/:postId (DELETE)', () => {
    let newPost: PostEntity;

    beforeAll(async () => {
      const post = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'testing post title',
          description: 'testing post description',
        })
        .set('Cookie', testingCookies);

      newPost = post.body.post;
    });

    it('not found post', async () => {
      const result = await request(app.getHttpServer())
        .delete(basePath + '/' + newPost.id + 1)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('not owner post', async () => {
      const loginInfo = await testingLogin(app);

      const user = loginInfo.user;
      const cookies = loginInfo.cookies;

      const result = await request(app.getHttpServer())
        .delete(basePath + '/' + newPost.id)
        .set('Cookie', cookies);

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(errorCode).toBe(ERROR_CODE.CODE006);

      await prismaService.user.delete({
        where: {
          id: user.id,
        },
      });
    });

    it('delete post', async () => {
      const result = await request(app.getHttpServer())
        .delete(basePath + '/' + newPost.id)
        .set('Cookie', testingCookies);

      const { statusCode, body } = result;
      const { count } = body;

      expect(statusCode).toBe(HttpStatus.OK);

      expect(count).toBeInteger();
    });

    afterAll(async () => {
      await prismaService.post.delete({
        where: {
          id: newPost.id,
        },
      });
    });
  });

  describe('/api/v1/posts/:postId/hit (PUT)', () => {
    let newPost: PostEntity;

    beforeAll(async () => {
      const post = await request(app.getHttpServer())
        .post(basePath)
        .send({
          title: 'testing post title',
          description: 'testing post description',
        })
        .set('Cookie', testingCookies);

      newPost = post.body.post;
    });

    it('not found post', async () => {
      const result = await request(app.getHttpServer()).put(
        basePath + '/' + newPost.id + 1 + '/' + 'hit',
      );

      const { statusCode, body } = result;
      const { errorCode } = body;

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(errorCode).toBe(ERROR_CODE.CODE005);
    });

    it('update hit post', async () => {
      const result = await request(app.getHttpServer()).put(
        basePath + '/' + newPost.id + '/' + 'hit',
      );

      const { statusCode } = result;

      expect(statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    afterAll(async () => {
      await prismaService.post.delete({
        where: {
          id: newPost.id,
        },
      });
    });
  });
});
