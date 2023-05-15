import { Test, TestingModule } from '@nestjs/testing';
import {
  MockPostAuthorityHelper,
  MockQueryHelper,
} from '@test/mock/helper.mock';
import { PrismaService } from '@src/core/database/prisma/prisma.service';
import { mockPrismaService } from '@test/mock/prisma-service.mock';
import { QueryHelper } from '@src/helpers/query.helper';
import { PostService } from '@src/apis/post/services/post.service';
import { PostAuthorityHelper } from '@src/apis/post/helpers/post-authority.helper';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: PostAuthorityHelper,
          useClass: MockPostAuthorityHelper,
        },
        {
          provide: QueryHelper,
          useClass: MockQueryHelper,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
