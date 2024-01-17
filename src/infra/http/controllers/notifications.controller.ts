import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }
}
