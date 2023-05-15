export class MockUserService {
  create = jest.fn();
  findOne = jest.fn();
}

export class MockPostService {
  create = jest.fn();
  findAll = jest.fn();
  findOne = jest.fn();
  putUpdate = jest.fn();
  patchUpdate = jest.fn();
  remove = jest.fn();
}

export class MockAuthService {
  login = jest.fn();
}
