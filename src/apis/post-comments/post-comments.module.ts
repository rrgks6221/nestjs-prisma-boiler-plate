import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/core/prisma/prisma.module';
import { QueryHelper } from '@src/helpers/query.helper';
import { PostCommentsController } from './controllers/post-comments.controller';
import { PostCommentsService } from './services/post-comments.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostCommentsController],
  providers: [PostCommentsService, QueryHelper],
})
export class PostCommentsModule {}
