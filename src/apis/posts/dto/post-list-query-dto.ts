import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { stringBooleanTransform } from '@src/common/common';
import { BooleanString } from '@src/constants/enum';
import { PageDto } from '@src/dtos/page.dto';
import { SortDto } from '@src/dtos/sort.dto';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, MaxLength } from 'class-validator';

export class PostListQueryDto extends IntersectionType(PageDto, SortDto) {
  @ApiProperty({
    description: 'posts 고유 Id',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number | null;

  @ApiProperty({
    description: '게시 여부',
    required: false,
    enum: BooleanString,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(stringBooleanTransform)
  published?: boolean | null;

  @ApiProperty({
    description: 'title',
    required: false,
  })
  @IsOptional()
  @MaxLength(30)
  title?: string | null;

  @ApiProperty({
    description: 'description',
    required: false,
    default: null,
  })
  @IsOptional()
  @MaxLength(30)
  description?: string | null;

  @ApiProperty({
    description: '게시한 유저 고유 id',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  authorId?: number | null;
}
