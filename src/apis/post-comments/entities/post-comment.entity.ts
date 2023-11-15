import { PostComment } from '@prisma/client';
import { BaseEntity } from '@src/entities/base.entity';

export class PostCommentEntity extends BaseEntity implements PostComment {
  postId: number;

  userId: number;

  description: string;

  constructor(postComment: Partial<PostCommentEntity> = {}) {
    super();

    Object.assign(this, postComment);
  }
}
