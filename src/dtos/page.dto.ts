import { ApiPropertyOptional } from '@nestjs/swagger';
import { pageTransform } from '@src/common/common';
import { DEFAULT_PAGE_SIZE } from '@src/constants/constant';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PageDto {
  @ApiPropertyOptional({
    description: '페이지번호',
    type: 'number',
    format: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Transform(pageTransform)
  page = 0;

  @ApiPropertyOptional({
    description: '페이지당 아이템 수',
    type: 'number',
    format: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize = DEFAULT_PAGE_SIZE;
}
