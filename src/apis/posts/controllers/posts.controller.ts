import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/apis/auth/guards/jwt-auth.guard';
import {
  ApiCreate,
  ApiFindAllAndCount,
  ApiFindOne,
  ApiPatchUpdate,
  ApiPutUpdate,
  ApiRemove,
} from '@src/apis/posts/controllers/posts.swagger';
import { CreatePostBodyDto } from '@src/apis/posts/dto/create-post-body.dto';
import { FindPostListQueryDto } from '@src/apis/posts/dto/find-post-list-query-dto';
import { PatchUpdatePostBodyDto } from '@src/apis/posts/dto/patch-update-post-body.dto';
import { PostBaseResponseDto } from '@src/apis/posts/dto/post-base-response.dto';
import { PutUpdatePostBodyDto } from '@src/apis/posts/dto/put-update-post-body-dto';
import { PostEntity } from '@src/apis/posts/entities/post.entity';
import { PostsService } from '@src/apis/posts/services/posts.service';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import {
  ResponseType,
  SetResponse,
} from '@src/decorators/set-response.decorator';
import { User } from '@src/decorators/user.decorator';
import { ParsePositiveIntPipe } from '@src/pipes/parse-positive-int.pipe';
import { BaseController } from '@src/types/type';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('api/posts')
export class PostsController
  implements BaseController<PostEntity, PostBaseResponseDto>
{
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiFindAllAndCount('post 전체 조회')
  @SetResponse({ key: 'posts', type: ResponseType.Pagination })
  findAllAndCount(
    @Query()
    findPostListQueryDto: FindPostListQueryDto,
  ): Promise<[PostEntity[], number]> {
    return this.postService.findAllAndCount(findPostListQueryDto);
  }

  @Get(':postId')
  @ApiFindOne('post 상세 조회')
  @SetResponse({ key: 'post', type: ResponseType.Base })
  findOne(
    @Param('postId', ParsePositiveIntPipe) postId: number,
  ): Promise<PostEntity> {
    return this.postService.findOne(postId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreate('post 생성')
  @SetResponse({ key: 'post', type: ResponseType.Base })
  @Post()
  create(
    @User() user: UserEntity,
    @Body() createPostBodyDto: CreatePostBodyDto,
  ): Promise<PostEntity> {
    return this.postService.create(user.id, createPostBodyDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiPutUpdate('post 수정')
  @SetResponse({ key: 'post', type: ResponseType.Base })
  @Put(':postId')
  putUpdate(
    @Param('postId', ParsePositiveIntPipe) postId: number,
    @User() user: UserEntity,
    @Body() putUpdatePostDto: PutUpdatePostBodyDto,
  ): Promise<PostEntity> {
    return this.postService.putUpdate(postId, user.id, putUpdatePostDto);
  }

  @ApiPatchUpdate('post 부분 수정')
  @UseGuards(JwtAuthGuard)
  @SetResponse({ key: 'post', type: ResponseType.Base })
  @Patch(':postId')
  patchUpdate(
    @Param('postId', ParsePositiveIntPipe) postId: number,
    @User() user: UserEntity,
    @Body() patchUpdatePostDto: PatchUpdatePostBodyDto,
  ): Promise<PostEntity> {
    return this.postService.patchUpdate(postId, user.id, patchUpdatePostDto);
  }

  @ApiRemove('post 삭제')
  @UseGuards(JwtAuthGuard)
  @SetResponse({ type: ResponseType.Delete })
  @Delete(':postId')
  remove(
    @Param('postId', ParsePositiveIntPipe) postId: number,
    @User() user: UserEntity,
  ): Promise<number> {
    return this.postService.remove(postId, user.id);
  }
}
