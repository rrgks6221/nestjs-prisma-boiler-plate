import { PostComment } from '@prisma/client';

export const POST_COMMENT_ORDER_FIELD: readonly (keyof Partial<PostComment>)[] =
  ['id', 'description', 'postId', 'userId', 'createdAt', 'updatedAt'] as const;
