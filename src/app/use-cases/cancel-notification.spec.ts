import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotificationUseCase } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: CancelNotificationUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CancelNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
