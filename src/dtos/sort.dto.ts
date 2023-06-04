import { ApiProperty } from '@nestjs/swagger';
import { PostField } from '@src/apis/posts/constants/post.enum';
import { SortOrder } from '@src/constants/enum';
import { IsEssential } from '@src/decorators/is-essential.decorator';
import { IsEnum, IsOptional } from 'class-validator';

export class SortDto {
  @ApiProperty({
    description: '정렬에 사용할 필드',
    required: false,
    enum: PostField,
  })
  @IsOptional()
  @IsEnum(PostField)
  sortBy: PostField = PostField.Id;

  @ApiProperty({
    description: '정렬순서 ASC : 오름차순, DESC : 내림차순',
    required: false,
    enum: SortOrder,
  })
  @IsEssential<SortDto>(['sortBy'])
  @IsOptional()
  @IsEnum(SortOrder)
  orderBy: SortOrder = SortOrder.Desc;
}
