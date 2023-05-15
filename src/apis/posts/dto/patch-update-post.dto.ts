import { ApiProperty } from '@nestjs/swagger';

export class PatchUpdatePostDto {
  @ApiProperty({
    description: 'description',
  })
  description: string;
}
