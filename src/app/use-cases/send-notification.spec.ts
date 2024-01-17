import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification';

describe('Send notification', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: SendNotificationUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sut.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
