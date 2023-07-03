import { PickType } from '@nestjs/swagger';
import { CreatePostRequestBodyDto } from '@src/apis/posts/dto/create-post-request-body.dto';

export class PutUpdatePostBodyDto extends PickType(CreatePostRequestBodyDto, [
  'title',
  'description',
] as const) {}
