import { Test } from '@nestjs/testing';
import { WishlistController } from './wishlists.controller';
import { WishlistService } from './wishlists.service';
import { Wishlist } from './wishlists.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/items/items.entity';
import { User } from 'data/entities/User';

describe('WishlistController', () => {
  let controller: WishlistController;
  let service: jest.Mocked<WishlistService>;

  const mockWishlistService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [{ provide: WishlistService, useValue: mockWishlistService }],
    }).compile();

    controller = moduleRef.get(WishlistController);
    service = moduleRef.get(WishlistService);
    jest.clearAllMocks();
  });

  it('create returns created wishlist', async () => {
    const dto = {
      name: 'Birthday Wishlist',
      description: 'Things I want for my birthday',
      items: [1, 2],
      user_id: 'user-123',
    };

    const created: Wishlist = {
      id: 1,
      name: dto.name,
      description: dto.description,
      items: [],
      user: { id: 'user-123' } as any,
    };

    service.create.mockResolvedValue(created);

    await expect(controller.create(dto)).resolves.toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('getAll returns wishlists', async () => {
    const wishlists: Wishlist[] = [
      {
        id: 1,
        name: 'Birthday Wishlist',
        description: 'Things I want for my birthday',
        items: [],
        user: { id: 'user-123' } as any,
      },
    ];

    service.findAll.mockResolvedValue(wishlists);

    await expect(controller.getAll()).resolves.toEqual(wishlists);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('getAll returns empty array when no wishlists exist', async () => {
    service.findAll.mockResolvedValue([]);

    await expect(controller.getAll()).resolves.toEqual([]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});

describe('WishlistService', () => {
  let service: WishlistService;
  let mockRepository: any;
  let mockDataSource: any;
  let mockManager: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
    };

    mockManager = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    mockDataSource = {
      transaction: jest.fn((cb) => cb(mockManager)),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        WishlistService,
        { provide: getRepositoryToken(Wishlist), useValue: mockRepository },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = moduleRef.get(WishlistService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all wishlists with user relations', async () => {
      const wishlists: Wishlist[] = [
        {
          id: 1,
          name: 'My Wishlist',
          description: 'Description',
          items: [],
          user: { id: 'user-123' } as any,
        },
      ];

      mockRepository.find.mockResolvedValue(wishlists);

      const result = await service.findAll();

      expect(result).toEqual(wishlists);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: { user: true },
      });
    });
  });

  describe('create', () => {
    const dto = {
      name: 'New Wishlist',
      description: 'A new wishlist',
      items: [1, 2],
      user_id: 'user-123',
    };

    const mockItems: Item[] = [
      { id: 1, name: 'Item 1', description: 'D1', link: 'L1', photoLink: 'P1' },
      { id: 2, name: 'Item 2', description: 'D2', link: 'L2', photoLink: 'P2' },
    ];

    const mockUser: Partial<User> = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
    };

    it('creates a wishlist successfully', async () => {
      const createdWishlist: Wishlist = {
        id: 1,
        name: dto.name,
        description: dto.description,
        items: mockItems,
        user: mockUser as any,
      };

      mockManager.find.mockResolvedValue(mockItems);
      mockManager.findOne.mockResolvedValue(mockUser);
      mockManager.create.mockReturnValue(createdWishlist);
      mockManager.save.mockResolvedValue(createdWishlist);

      const result = await service.create(dto);

      expect(result).toEqual(createdWishlist);
      expect(mockManager.find).toHaveBeenCalledWith(Item, {
        where: { id: In(dto.items) },
      });
      expect(mockManager.findOne).toHaveBeenCalledWith(User, {
        where: { id: dto.user_id },
      });
      expect(mockManager.create).toHaveBeenCalledWith(Wishlist, {
        name: dto.name,
        description: dto.description,
        items: mockItems,
        user: mockUser,
      });
      expect(mockManager.save).toHaveBeenCalledWith(createdWishlist);
    });

    it('throws NotFoundException when items are not found', async () => {
      mockManager.find.mockResolvedValue([mockItems[0]]); // Only return 1 item instead of 2

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      await expect(service.create(dto)).rejects.toThrow(
        'One or more items not found',
      );
    });

    it('throws NotFoundException when user is not found', async () => {
      mockManager.find.mockResolvedValue(mockItems);
      mockManager.findOne.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      await expect(service.create(dto)).rejects.toThrow(
        `Could not find the user by the following id: ${dto.user_id}`,
      );
    });

    it('creates wishlist with empty items array', async () => {
      const emptyItemsDto = {
        name: 'Empty Wishlist',
        description: 'A wishlist with no items',
        items: [],
        user_id: 'user-123',
      };

      const createdWishlist: Wishlist = {
        id: 1,
        name: emptyItemsDto.name,
        description: emptyItemsDto.description,
        items: [],
        user: mockUser as any,
      };

      mockManager.find.mockResolvedValue([]);
      mockManager.findOne.mockResolvedValue(mockUser);
      mockManager.create.mockReturnValue(createdWishlist);
      mockManager.save.mockResolvedValue(createdWishlist);

      const result = await service.create(emptyItemsDto);

      expect(result).toEqual(createdWishlist);
      expect(mockManager.save).toHaveBeenCalled();
    });
  });
});

