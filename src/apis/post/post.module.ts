import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { PrismaModule } from '@src/core/database/prisma/prisma.module';
import { PostAuthorityHelper } from '@src/apis/post/helpers/post-authority.helper';
import { QueryHelper } from '@src/helpers/query.helper';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PostAuthorityHelper, QueryHelper],
})
export class PostModule {}
