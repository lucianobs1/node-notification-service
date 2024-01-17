import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
