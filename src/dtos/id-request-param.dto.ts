import { ApiProperty } from '@nestjs/swagger';
import { IsRecord } from '@src/decorators/validator/is-record.decorator';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class IdRequestParamDto {
  @ApiProperty({
    description: '고유 ID',
    type: 'number',
    required: true,
  })
  @Type(() => Number)
  @IsRecord({}, true)
  @Min(1)
  id: number;

  @IsOptional()
  private model: string;
}
