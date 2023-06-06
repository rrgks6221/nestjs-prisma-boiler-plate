import { AuthService } from '@src/apis/auth/services/auth.service';
import { PostsService } from '@src/apis/posts/services/posts.service';
import { UsersService } from '@src/apis/users/services/users.service';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { MockClass } from '@test/mock/type';

export class MockUserService implements MockClass<UsersService> {
  create = jest.fn();
  findOne = jest.fn();
}

export class MockPostService implements MockClass<PostsService> {
  findAllAndCount = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  putUpdate = jest.fn();
  patchUpdate = jest.fn();
  remove = jest.fn();
}

export class MockAuthService implements MockClass<AuthService> {
  createAccessToken = jest.fn();
  login = jest.fn();
}

export class MockAppConfigService implements MockClass<AppConfigService> {
  get = jest.fn();
  getList = jest.fn();
  getAll = jest.fn();
  getAllMap = jest.fn();
  isLocal = jest.fn();
  isDevelopment = jest.fn();
  isProduction = jest.fn();
}
