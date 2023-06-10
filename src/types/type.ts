export type PrismaModel = 'user' | 'post';

export type Target = {
  model?: PrismaModel;
  field?: string;
};

export interface BaseController<T> {
  findAllAndCount?(...args: unknown[]): Promise<[T[], number]>;
  findOne?(...args: unknown[]): Promise<T>;
  create?(...args: unknown[]): Promise<T>;
  putUpdate?(...args: unknown[]): Promise<T>;
  patchUpdate?(...args: unknown[]): Promise<T>;
  remove?(...args: unknown[]): Promise<number>;
}
