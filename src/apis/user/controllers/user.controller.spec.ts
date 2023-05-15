import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/apis/user/services/user.service';
import { UserController } from '@src/apis/user/controllers/user.controller';
import { MockUserService } from '@test/mock/servies.mock';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
