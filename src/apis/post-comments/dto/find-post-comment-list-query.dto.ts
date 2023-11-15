import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostCommentEntity } from '@src/apis/post-comments/entities/post-comment.entity';
import { POST_ORDER_FIELD } from '@src/apis/posts/constants/post.constant';
import { SortOrder } from '@src/constants/enum';
import { ApiPropertyOrderBy } from '@src/decorators/swagger/api-property-order-by.decorator';
import {
  CsvToOrderBy,
  OrderBy,
} from '@src/decorators/transformer/csv-to-order-by.decorator';
import { IsPositiveInt } from '@src/decorators/validator/is-positive-int.decorator';
import { PageDto } from '@src/dtos/page.dto';
import { IsOptional } from 'class-validator';

export class FindPostCommentListQueryDto
  extends PageDto
  implements Partial<PostCommentEntity>
{
  @ApiPropertyOptional({
    description: 'postComment 고유 Id',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  id?: number;

  @ApiPropertyOptional({
    description: 'post 고유 Id',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  postId?: number;

  @ApiPropertyOptional({
    description: '게시한 유저 고유 id',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  userId?: number;

  @ApiPropertyOptional({
    description: 'description',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOrderBy(POST_ORDER_FIELD)
  @CsvToOrderBy<typeof POST_ORDER_FIELD>([...POST_ORDER_FIELD])
  @IsOptional()
  orderBy: OrderBy<typeof POST_ORDER_FIELD> = { id: SortOrder.Desc };
}
