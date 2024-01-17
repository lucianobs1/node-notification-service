import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipients Notifications', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: CountRecipientNotificationsUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountRecipientNotificationsUseCase(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to count recipient notifications', async () => {
    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await sut.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
