import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotificationUseCase } from './unread-notification';

describe('Unread notification', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: UnreadNotificationUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
