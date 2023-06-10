import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/core/app-config/app-config.module';
import { HttpExceptionFiltersModule } from '@src/core/http-exception-filters/http-exception-filters.module';
import { NotificationModule } from '@src/core/notification/notification.module';
import { PrismaModule } from '@src/core/prisma/prisma.module';

@Module({
  imports: [
    NotificationModule,
    PrismaModule,
    HttpExceptionFiltersModule,
    AppConfigModule,
  ],
  exports: [NotificationModule, PrismaModule, AppConfigModule],
})
export class CoreModule {}
