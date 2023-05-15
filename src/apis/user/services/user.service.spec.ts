import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@src/core/auth/services/auth.service';
import { MockAuthService } from '@test/mock/servies.mock';
import { PrismaService } from '@src/core/database/prisma/prisma.service';
import { mockPrismaService } from '@test/mock/prisma-service.mock';
import { UserService } from '@src/apis/user/services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
