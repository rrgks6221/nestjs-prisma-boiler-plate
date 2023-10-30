import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import redisStore from 'cache-manager-redis-store';

@Injectable()
export class AppCacheModuleConfig implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.appConfigService.get<string>(ENV_KEY.CACHE_HOST),
      port: this.appConfigService.get<string>(ENV_KEY.CACHE_PORT),
      isGlobal: true,
    };
  }
}
