import { Test, TestingModule } from '@nestjs/testing';
import {
  MockPostAuthorityHelper,
  MockQueryHelper,
} from '@test/mock/helper.mock';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { mockPrismaService } from '@test/mock/prisma-service.mock';
import { QueryHelper } from '@src/helpers/query.helper';
import { PostsService } from '@src/apis/posts/services/posts.service';
import { PostsAuthorityHelper } from '@src/apis/posts/helpers/posts-authority.helper';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: PostsAuthorityHelper,
          useClass: MockPostAuthorityHelper,
        },
        {
          provide: QueryHelper,
          useClass: MockQueryHelper,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
