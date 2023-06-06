import Mock = jest.Mock;

export type MockClass<T> = { [key in keyof T]: Mock };
