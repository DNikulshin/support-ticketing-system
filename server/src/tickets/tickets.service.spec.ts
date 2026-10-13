import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRole, TicketStatus, TicketPriority } from '@prisma/client';

describe('TicketsService (Unit)', () => {
  let ticketsService: TicketsService;
  let prismaService: any;

  const mockPrismaService = {
    ticket: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    ticketsService = module.get<TicketsService>(TicketsService);
    prismaService = module.get(PrismaService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a ticket with creatorId and return the created record', async () => {
      const dto = {
        title: 'Network outage in Office 3',
        description: 'Router unreachable',
        priority: TicketPriority.HIGH,
      };

      const expectedTicket = {
        id: 't-123',
        ...dto,
        status: TicketStatus.OPEN,
        creatorId: 'usr-1',
        createdAt: new Date(),
      };

      mockPrismaService.ticket.create.mockResolvedValue(expectedTicket);

      const result = await ticketsService.create(dto as any, 'usr-1');

      expect(result).toEqual(expectedTicket);
      expect(mockPrismaService.ticket.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          creatorId: 'usr-1',
        },
        include: expect.any(Object),
      });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if ticket does not exist', async () => {
      mockPrismaService.ticket.findUnique.mockResolvedValue(null);

      await expect(
        ticketsService.findOne('non-existent-id', { id: 'usr-1', role: UserRole.ADMIN }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if regular user accesses another user ticket', async () => {
      mockPrismaService.ticket.findUnique.mockResolvedValue({
        id: 't-1',
        creatorId: 'other-user',
        status: TicketStatus.OPEN,
      });

      await expect(
        ticketsService.findOne('t-1', { id: 'my-user-id', role: UserRole.USER }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow admin to view any ticket', async () => {
      const ticket = {
        id: 't-1',
        creatorId: 'other-user',
        status: TicketStatus.OPEN,
      };
      mockPrismaService.ticket.findUnique.mockResolvedValue(ticket);

      const result = await ticketsService.findOne('t-1', { id: 'admin-id', role: UserRole.ADMIN });
      expect(result).toEqual(ticket);
    });
  });
});
