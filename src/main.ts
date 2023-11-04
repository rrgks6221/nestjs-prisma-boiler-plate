import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { AppService } from '@src/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get<AppService>(AppService);

  appService.setCors(app);
  appService.setHelmet(app);
  appService.setCookieParser(app);

  appService.setGlobalPipe(app);
  appService.setGlobalInterceptor(app);
  appService.setGlobalFilter(app);

  appService.setSwagger(app);

  appService.setEnableShutdownHooks(app);

  await appService.setPrisma(app);

  await appService.startingServer(app);
}

bootstrap();
