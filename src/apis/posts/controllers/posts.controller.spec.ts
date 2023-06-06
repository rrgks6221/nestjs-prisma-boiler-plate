import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '@src/apis/posts/controllers/posts.controller';
import { PostsService } from '@src/apis/posts/services/posts.service';
import { MockPostService } from '@test/mock/services.mock';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useClass: MockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
