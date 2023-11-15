import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostCommentRequestBodyDto } from '@src/apis/post-comments/dto/create-post-comment-request-body.dto';
import { IsNotEmptyString } from '@src/decorators/validator/is-not-empty-string.decorator';
import { IsOptional } from 'class-validator';

export class PatchUpdatePostCommentRequestBodyDto
  implements Partial<CreatePostCommentRequestBodyDto>
{
  @ApiPropertyOptional({
    description: 'description',
  })
  @IsNotEmptyString()
  @IsOptional()
  description?: string;
}
