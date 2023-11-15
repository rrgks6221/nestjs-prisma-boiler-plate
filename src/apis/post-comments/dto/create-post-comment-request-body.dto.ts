import { ApiProperty } from '@nestjs/swagger';
import { PostCommentEntity } from '@src/apis/post-comments/entities/post-comment.entity';
import { IsNotEmptyString } from '@src/decorators/validator/is-not-empty-string.decorator';

export class CreatePostCommentRequestBodyDto
  implements Pick<PostCommentEntity, 'description'>
{
  @ApiProperty({
    description: 'description',
  })
  @IsNotEmptyString()
  description: string;
}
