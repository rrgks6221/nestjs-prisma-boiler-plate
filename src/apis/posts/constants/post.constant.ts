import { Post } from '@prisma/client';

export const POST_ORDER_FIELD: readonly (keyof Partial<Post>)[] = [
  'id',
  'title',
  'userId',
] as const;
