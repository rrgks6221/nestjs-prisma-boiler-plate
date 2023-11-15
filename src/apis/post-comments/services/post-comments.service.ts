import { Injectable } from '@nestjs/common';
import { PostCommentResponseDto } from '@src/apis/post-comments/dto/post-comment-response.dto';
import { RestService } from '@src/types/type';

@Injectable()
export class PostCommentsService
  implements RestService<PostCommentResponseDto>
{
  findAllAndCount(
    ...args: unknown[]
  ): Promise<[PostCommentResponseDto[], number]> {
    throw new Error('Method not implemented.');
  }

  findOneOrNotFound(...args: unknown[]): Promise<PostCommentResponseDto> {
    throw new Error('Method not implemented.');
  }

  create(...args: unknown[]): Promise<PostCommentResponseDto> {
    throw new Error('Method not implemented.');
  }

  putUpdate(...args: unknown[]): Promise<PostCommentResponseDto> {
    throw new Error('Method not implemented.');
  }

  patchUpdate(...args: unknown[]): Promise<PostCommentResponseDto> {
    throw new Error('Method not implemented.');
  }

  remove(...args: unknown[]): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
