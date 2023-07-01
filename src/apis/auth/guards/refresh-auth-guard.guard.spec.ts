import { RefreshAuthGuard } from '@src/apis/auth/guards/refresh-auth-guard.guard';

describe('RefreshAuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new RefreshAuthGuard()).toBeDefined();
  });
});
