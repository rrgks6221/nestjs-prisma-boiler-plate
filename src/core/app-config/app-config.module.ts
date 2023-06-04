import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_KEY } from '@src/core/app-config/constants/api-config.constant';
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
        [ENV_KEY.JWT_ACCESS_KEY]: Joi.string().required(),
        [ENV_KEY.DATABASE_URL]: Joi.string().required(),
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
