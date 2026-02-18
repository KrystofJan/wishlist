import { Test } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemService } from './items.service';
import { Item } from './items.entity';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: jest.Mocked<ItemService>;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemService, useValue: mockItemsService }],
    }).compile();

    controller = moduleRef.get(ItemsController);
    service = moduleRef.get(ItemService);
    jest.clearAllMocks();
  });

  it('create returns created item', async () => {
    const dto = {
      name: 'A',
      description: 'D',
      link: 'https://x.com',
      photoLink: 'https://img.com/a.png',
    };

    const created: Item = { id: 1, categories: [], ...dto };

    service.create.mockResolvedValue(created);

    await expect(controller.create(dto)).resolves.toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('getAll returns items', async () => {
    const items = [
      {
        id: 1,
        name: 'A',
        description: 'D',
        link: 'L',
        photoLink: 'P',
        categories: [],
      },
    ];

    service.findAll.mockResolvedValue(items);

    await expect(controller.getAll()).resolves.toEqual(items);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
