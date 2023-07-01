import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { AppConfigModule } from '@src/core/app-config/app-config.module';
import { HttpExceptionFiltersModule } from '@src/core/http-exception-filters/http-exception-filters.module';
import { NotificationModule } from '@src/core/notification/notification.module';
import { PrismaModule } from '@src/core/prisma/prisma.module';
import redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore as unknown as CacheStore,
      url: 'redis://localhost:6379',
      isGlobal: true,
    }),
    NotificationModule,
    PrismaModule,
    HttpExceptionFiltersModule,
    AppConfigModule,
  ],
  exports: [NotificationModule, PrismaModule, AppConfigModule, CacheModule],
})
export class CoreModule {}
