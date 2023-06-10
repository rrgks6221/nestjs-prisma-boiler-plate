import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@src/apis/auth/controllers/auth.controller';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { MockAuthService } from '@test/mock/services.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: MockAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    mockAuthService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
