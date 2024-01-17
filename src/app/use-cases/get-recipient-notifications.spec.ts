import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications';

describe('Get Recipients Notifications', () => {
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let sut: GetRecipientNotificationsUseCase;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new GetRecipientNotificationsUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to get recipient notifications', async () => {
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

    const { notifications } = await sut.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
