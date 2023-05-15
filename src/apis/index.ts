import { HealthModule } from '@src/apis/health/health.module';
import { PostsModule } from '@src/apis/posts/posts.module';
import { UserModule } from '@src/apis/user/user.module';

export const apiModules = [HealthModule, PostsModule, UserModule];
