import { Test } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoriesController } from './category.controller';
import { Category } from './category.entity';

describe('ItemsController', () => {
  let controller: CategoriesController;
  let service: jest.Mocked<CategoryService>;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoryService, useValue: mockItemsService }],
    }).compile();

    controller = moduleRef.get(CategoriesController);
    service = moduleRef.get(CategoryService);
    jest.clearAllMocks();
  });

  it('create returns created item', async () => {
    const dto = {
      name: 'A',
    };

    const created: Category = { id: 1, ...dto, items: [] };

    service.create.mockResolvedValue(created);

    await expect(controller.create(dto)).resolves.toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('getAll returns items', async () => {
    const categories = [
      {
        id: 1,
        name: 'A',
        items: [],
      },
    ];

    service.findAll.mockResolvedValue(categories);

    await expect(controller.getAll()).resolves.toEqual(categories);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
