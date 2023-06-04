import { ApiPropertyOptional } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { POST_ORDER_FIELD } from '@src/apis/posts/constants/post.constant';
import { stringBooleanTransform } from '@src/common/common';
import { ApiPropertyOrderBy } from '@src/decorators/api-property-order-by.decorator';
import {
  CsvToOrderBy,
  OrderBy,
} from '@src/decorators/csv-to-order-by.decorator';
import { PageDto } from '@src/dtos/page.dto';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, MaxLength } from 'class-validator';

export class PostListQueryDto extends PageDto implements Partial<Post> {
  @ApiPropertyOptional({
    description: 'posts 고유 Id',
    format: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @ApiPropertyOptional({
    description: '게시 여부',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(stringBooleanTransform)
  published?: boolean;

  @ApiPropertyOptional({
    description: 'title',
    maxLength: 255,
  })
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'description',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: '게시한 유저 고유 id',
    format: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOrderBy(POST_ORDER_FIELD)
  @CsvToOrderBy<typeof POST_ORDER_FIELD>([...POST_ORDER_FIELD])
  orderBy: OrderBy<typeof POST_ORDER_FIELD>;
}
