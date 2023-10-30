import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', 'env'],
      validationSchema: Joi.object({
        [ENV_KEY.PORT]: Joi.number().default(3000),
        [ENV_KEY.NODE_ENV]: Joi.string().required(),

        [ENV_KEY.DATABASE_URL]: Joi.string().required(),

        [ENV_KEY.CACHE_HOST]: Joi.string().required(),
        [ENV_KEY.CACHE_PORT]: Joi.number().required(),

        [ENV_KEY.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
        [ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION_MS]: Joi.number().required(),
        [ENV_KEY.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
        [ENV_KEY.JWT_REFRESH_TOKEN_EXPIRATION_MS]: Joi.number().required(),

        [ENV_KEY.NOTIFICATION_SERVER_EXCEPTION]: Joi.string().required(),
      }),
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule implements OnApplicationBootstrap {
  constructor(private readonly appConfigService: AppConfigService) {}

  onApplicationBootstrap() {
    console.log(this.appConfigService.getAllMap());
  }
}
