import { Module } from '@nestjs/common';
import { NotificationModule } from '@src/core/notification/notification.module';
import { AuthModule } from '@src/core/auth/auth.module';
import { PrismaModule } from '@src/core/prisma/prisma.module';
import { ExceptionFilterModule } from '@src/core/exception/exception-filter.module';

@Module({
  imports: [
    NotificationModule,
    AuthModule,
    PrismaModule,
    ExceptionFilterModule,
  ],
  exports: [NotificationModule, AuthModule, PrismaModule],
})
export class CoreModule {}
