import { PickType } from '@nestjs/swagger';
import { CreatePostCommentRequestBodyDto } from '@src/apis/post-comments/dto/create-post-comment-request-body.dto';

export class PutUpdatePostCommentRequestBodyDto extends PickType(
  CreatePostCommentRequestBodyDto,
  ['description'] as const,
) {}
