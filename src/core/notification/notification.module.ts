import { Module } from '@nestjs/common';
import {
  EMBED_BUILDER_TOKEN,
  WEBHOOK_CLIENT_TOKEN,
} from '@src/core/notification/constants/notification.constant';
import { NotificationService } from '@src/core/notification/services/notification.service';
import { EmbedBuilder, WebhookClient } from 'discord.js';

@Module({
  providers: [
    NotificationService,
    {
      provide: EMBED_BUILDER_TOKEN,
      useValue: EmbedBuilder,
    },
    {
      provide: WEBHOOK_CLIENT_TOKEN,
      useValue: WebhookClient,
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
