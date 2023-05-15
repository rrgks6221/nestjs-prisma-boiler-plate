import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@src/core/auth/services/auth.service';
import { MockAuthService } from '@test/mock/servies.mock';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { mockPrismaService } from '@test/mock/prisma-service.mock';
import { UsersService } from '@src/apis/users/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
