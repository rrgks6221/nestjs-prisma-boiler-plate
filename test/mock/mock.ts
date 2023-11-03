import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export const mockRequest = {
  query: {},
  params: {},
  user: {},
  method: null,
  path: null,
} as any;

export const mockResponse = {
  status() {
    return this;
  },
  json: jest.fn(),
};

export const mockHttpArgumentHost = {
  switchToHttp() {
    return this;
  },

  getRequest() {
    return mockRequest;
  },

  getResponse() {
    return mockResponse;
  },
} as unknown as ArgumentsHost;

export const mockReflector = {
  get: jest.fn(),
};

export const mockContext = {
  switchToHttp() {
    return {
      getRequest() {
        return mockRequest;
      },
    };
  },
  getHandler() {
    return jest.fn();
  },
} as unknown as ExecutionContext;

export function getParamDecoratorFactory(
  decorator: (prop?: any) => ParameterDecorator,
  prop?: string,
) {
  class Test {
    public test(@decorator(prop) value: unknown) {
      return;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
