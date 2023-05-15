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
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { JwtAuthGuard } from '@src/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserLogin } from '@src/decorators/user.decorator';
import { Post as PostModel } from '@prisma/client';
import { PostEntity } from '@src/apis/posts/entities/post.entity';
import { IdRequestParamDto } from '@src/dtos/id-request-param.dto';
import { SetModelNameToParam } from '@src/decorators/set-model-name-to-param.decorator';
import { PatchUpdatePostDto } from '@src/apis/posts/dto/patch-update-post.dto';
import { PutUpdatePostDto } from '@src/apis/posts/dto/put-update-post-dto';
import { ModelName } from '@src/constants/enum';
import { PostListQueryDto } from '@src/apis/posts/dto/post-list-query-dto';
import { SetDefaultPageSize } from '@src/decorators/set-default-page-size.decorator';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ApiBearerAuth()
@ApiTags('post')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: 'posts 생성' })
  @ApiCreatedResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @UserLogin() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    return this.postService.create(user.id, createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'posts 전체 조회' })
  @ApiOkResponse({ type: [PostEntity] })
  findAll(
    @Query()
    @SetDefaultPageSize(30)
    query: PostListQueryDto,
  ) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'posts 상세 조회' })
  @ApiOkResponse({ type: PostEntity })
  findOne(
    @Param() @SetModelNameToParam(ModelName.Post) param: IdRequestParamDto,
  ): Promise<PostModel | null> {
    return this.postService.findOne(param.id);
  }

  @ApiOperation({ summary: 'posts 수정' })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  putUpdate(
    @Param() @SetModelNameToParam(ModelName.Post) param: IdRequestParamDto,
    @UserLogin('id') authorId: number,
    @Body() putUpdatePostDto: PutUpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.putUpdate(param.id, authorId, putUpdatePostDto);
  }

  @ApiOperation({ summary: 'posts 일부 수정' })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchUpdate(
    @Param() @SetModelNameToParam(ModelName.Post) param: IdRequestParamDto,
    @UserLogin('id') authorId: number,
    @Body() patchUpdatePostDto: PatchUpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.patchUpdate(param.id, authorId, patchUpdatePostDto);
  }

  @ApiOperation({ summary: 'posts 삭제' })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param() @SetModelNameToParam(ModelName.Post) param: IdRequestParamDto,
    @UserLogin('id') authorId: number,
  ): Promise<PostModel> {
    return this.postService.remove(param.id, authorId);
  }
}
