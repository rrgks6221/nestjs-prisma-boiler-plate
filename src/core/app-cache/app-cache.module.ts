import { CacheModule, Module } from '@nestjs/common';
import { AppCacheModuleConfig } from '@src/core/app-cache/app-cache-module.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: AppCacheModuleConfig,
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
