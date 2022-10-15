import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export const mockRequest = {
  query: {},
  params: {},
  user: {},
};
export const mock = {
  switchToHttp() {
    return this;
  },
  getRequest() {
    return mockRequest;
  },
};

export function getParamDecoratorFactory(decorator, prop?) {
  class Test {
    public test(@decorator(prop) value) {
      return;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
