import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Event } from 'src/shared/models/Event';
import { CreateEventDto } from '../../dto/create-event.dto';
import { UpdateEventDto } from '../../dto/update-event.dto';
import { IEventRepository } from '../event.repositories';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Event[] | null> {
    return await this.prisma.event.findMany({
      select: {
        id: true,
        name: true,
        date: true,
        attendances: {
          select: {
            id: true,
            memberId: true,
            eventId: true,
            attendanceStatus: true,
          },
        },
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
    });
  }

  async create(data: CreateEventDto): Promise<Event> {
    const event = await this.prisma.event.create({
      data,
      select: {
        id: true,
        name: true,
        date: true,
        attendances: true,
      },
    });

    return event;
  }

  async update(id: string, data: UpdateEventDto): Promise<Event> {
    const eventExists = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!eventExists) {
      throw new NotFoundException('Event does not exist');
    }

    const event = await this.prisma.event.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        date: true,
        attendances: true,
      },
    });

    return event;
  }

  async delete(id: string): Promise<Event> {
    const eventExist = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!eventExist) {
      throw new NotFoundException('Event does not exist');
    }

    const event = await this.prisma.event.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        date: true,
        attendances: true,
      },
    });

    return event;
  }

  async findUnique(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        date: true,
        attendances: true,
      },
    });

    return event;
  }

  async findEvent(name: string, date: string): Promise<Event> {
    const event = await this.prisma.event.findFirst({
      where: {
        name,
        date,
      },
    });

    return event;
  }
}
