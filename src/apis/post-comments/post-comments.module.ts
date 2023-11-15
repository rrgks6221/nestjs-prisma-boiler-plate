import { Module } from '@nestjs/common';
import { PostCommentsController } from './controllers/post-comments.controller';
import { PostCommentsService } from './services/post-comments.service';

@Module({
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
})
export class PostCommentsModule {}
