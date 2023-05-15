import { HealthModule } from '@src/apis/health/health.module';
import { PostModule } from '@src/apis/post/post.module';
import { UserModule } from '@src/apis/user/user.module';

export const apiModules = [HealthModule, PostModule, UserModule];
