import { Test, TestingModule } from '@nestjs/testing';
import { JWT_TOKEN_TYPE } from '@src/apis/auth/constants/auth.constant';
import { AuthHelper } from '@src/apis/auth/helpers/auth.helper';

describe('AuthHelper', () => {
  let helper: AuthHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthHelper],
    }).compile();

    helper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
  });

  describe('getRefreshKeyInStore', () => {
    it('스토어 키 생성', () => {
      expect(helper.getRefreshKeyInStore(1)).toBe('refreshUserId:1');
    });
  });

  describe('getBearerToken', () => {
    it('토큰 생성', () => {
      const token = 'token';

      expect(helper.getBearerToken(token)).toBe(`${JWT_TOKEN_TYPE} ${token}`);
    });
  });
});
