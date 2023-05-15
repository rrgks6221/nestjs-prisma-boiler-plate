import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PrismaModule } from '@src/core/database/prisma/prisma.module';
import { PostsAuthorityHelper } from '@src/apis/posts/helpers/posts-authority.helper';
import { QueryHelper } from '@src/helpers/query.helper';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, PostsAuthorityHelper, QueryHelper],
})
export class PostsModule {}
