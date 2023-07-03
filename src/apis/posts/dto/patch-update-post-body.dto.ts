import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostRequestBodyDto } from '@src/apis/posts/dto/create-post-request-body.dto';
import { IsNotEmptyString } from '@src/decorators/is-not-empty-string.decorator';
import { IsOptional, Length } from 'class-validator';

export class PatchUpdatePostBodyDto
  implements Partial<CreatePostRequestBodyDto>
{
  @ApiPropertyOptional({
    description: 'title',
    minLength: 1,
    maxLength: 255,
  })
  @Length(1, 255)
  @IsNotEmptyString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'description',
  })
  @IsNotEmptyString()
  @IsOptional()
  description?: string;
}
