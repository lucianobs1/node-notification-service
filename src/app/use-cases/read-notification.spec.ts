import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from './read-notification';

describe('Read notification', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: ReadNotificationUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
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
