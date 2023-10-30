import { Inject, Type } from '@nestjs/common';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import {
  EMBED_BUILDER_TOKEN,
  WEBHOOK_CLIENT_TOKEN,
} from '@src/core/notification/constants/notification.constant';
import {
  Field,
  NotificationOption,
  ServerExceptionField,
  WarningExceptionFiled,
} from '@src/core/notification/types/notification.type';
import { bold, EmbedBuilder, WebhookClient } from 'discord.js';

export class NotificationService {
  constructor(
    @Inject(EMBED_BUILDER_TOKEN)
    private readonly embedBuilder: Type<EmbedBuilder>,
    @Inject(WEBHOOK_CLIENT_TOKEN)
    private readonly webhookClient: Type<WebhookClient>,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * 400번대 에러 또는 인지해야하는 상황
   */
  async warning(exceptionField: WarningExceptionFiled): Promise<void> {
    const { description, ...serverExceptionField } = exceptionField;

    await this.send(
      this.appConfigService.get(ENV_KEY.NOTIFICATION_SERVER_EXCEPTION),
      {
        description,
        color: '#FFA500', // 주황
        title: 'server warning exception',
        fields: this.buildServerExceptionField(serverExceptionField),
      },
    );
  }

  /**
   * 500번대 에러 시
   */
  async error(exceptionField: ServerExceptionField): Promise<void> {
    await this.send(
      this.appConfigService.get(ENV_KEY.NOTIFICATION_SERVER_EXCEPTION),
      {
        color: '#a63641', // 빨강
        title: 'server error exception',
        fields: this.buildServerExceptionField(exceptionField),
      },
    );
  }

  /**
   * 실제 webhook 을 통해 보내는 메서드
   */
  async send(url: string, option: NotificationOption): Promise<void> {
    const { title, color, description, fields } = option;

    const webhookClient = new this.webhookClient({
      url,
    });

    const embed = new this.embedBuilder()
      .setTitle(title)
      .setColor(color)
      .setTimestamp();

    if (fields && fields.length) {
      embed.setFields(...fields);
    }

    if (description) {
      embed.setDescription(description);
    }

    await webhookClient
      .send({
        username: 'nestjsBoilerPlate',
        content: bold('nestjs boiler plate server notification'),
        avatarURL:
          'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        embeds: [embed],
      })
      .catch((e) => {
        console.error(e);
      });
  }

  private buildServerExceptionField(
    exceptionField: Partial<ServerExceptionField>,
  ): Field[] {
    const { name, method, path, status, body, stack } = exceptionField;
    const fields: Field[] = [];

    if (name) {
      fields.push({
        name: 'Exception name',
        value: name,
        inline: false,
      });
    }

    if (method) {
      fields.push({
        name: 'Method',
        value: method,
        inline: false,
      });
    }

    if (path) {
      fields.push({
        name: 'Path',
        value: path.slice(0, 1000),
        inline: true,
      });
    }

    if (status) {
      fields.push({
        name: 'Status',
        value: status.toString(),
        inline: true,
      });
    }

    if (body) {
      fields.push({
        name: 'Body',
        value: JSON.stringify(body).slice(0, 1000),
        inline: false,
      });
    }

    if (stack) {
      fields.push({
        name: 'Error Stack',
        value: JSON.stringify(stack).slice(0, 1000),
        inline: false,
      });
    }

    return fields;
  }
}
