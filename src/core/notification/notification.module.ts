import { Module } from '@nestjs/common';
import { NotificationService } from '@src/core/notification/services/notification.service';

@Module({
  providers: [NotificationService],
})
export class NotificationModule {}
