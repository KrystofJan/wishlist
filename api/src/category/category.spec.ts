import { Test } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoriesController } from './category.controller';
import { Category } from './category.entity';
import { Item } from 'src/items/items.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: jest.Mocked<CategoryService>;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findItemsInCategory: jest.fn(),
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

  it('create returns created category', async () => {
    const dto = {
      name: 'A',
    };

    const created: Category = { id: 1, ...dto, items: [] };

    service.create.mockResolvedValue(created);

    await expect(controller.create(dto)).resolves.toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('getAll returns categories', async () => {
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

  it('getCategoryItems returns items of given category', async () => {
    const items: Item[] = [
      {
        id: 1,
        name: 'A',
        description: 'D',
        link: 'L',
        photoLink: 'P',
      },
    ];

    service.findItemsInCategory.mockResolvedValue(items);

    await expect(controller.getItems(1)).resolves.toEqual(items);
    expect(service.findItemsInCategory).toHaveBeenCalledTimes(1);
  });
});
