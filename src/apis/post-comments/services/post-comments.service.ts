import { Injectable } from '@nestjs/common';
import { FindPostCommentListQueryDto } from '@src/apis/post-comments/dto/find-post-comment-list-query.dto';
import { PostCommentResponseDto } from '@src/apis/post-comments/dto/post-comment-response.dto';
import { PostCommentEntity } from '@src/apis/post-comments/entities/post-comment.entity';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { QueryHelper } from '@src/helpers/query.helper';
import { RestService } from '@src/types/type';

@Injectable()
export class PostCommentsService
  implements RestService<PostCommentResponseDto>
{
  private readonly LIKE_SEARCH_FIELDS: (keyof Partial<PostCommentEntity>)[] = [
    'description',
  ];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly queryHelper: QueryHelper,
  ) {}

  async findAllAndCount(
    postId: number,
    findPostCommentListQueryDto: FindPostCommentListQueryDto,
  ): Promise<[PostCommentResponseDto[], number]> {
    const { page, pageSize, orderBy, ...filter } = findPostCommentListQueryDto;

    const where = this.queryHelper.buildWherePropForFind<PostCommentEntity>(
      filter,
      this.LIKE_SEARCH_FIELDS,
    );

    const postCommentsQuery = this.prismaService.postComment.findMany({
      where: {
        ...where,
        postId,
        deletedAt: null,
      },
      orderBy,
      skip: page * pageSize,
      take: pageSize,
    });

    const totalCountQuery = this.prismaService.postComment.count({
      where: {
        ...where,
        postId,
        deletedAt: null,
      },
    });

    const [postComments, count] = await this.prismaService.$transaction([
      postCommentsQuery,
      totalCountQuery,
    ]);

    return [postComments, count];
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
