import { Test, TestingModule } from '@nestjs/testing';
import { MockPostService } from '@test/mock/servies.mock';
import { PostController } from '@src/apis/post/controllers/post.controller';
import { PostService } from '@src/apis/post/services/post.service';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useClass: MockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
