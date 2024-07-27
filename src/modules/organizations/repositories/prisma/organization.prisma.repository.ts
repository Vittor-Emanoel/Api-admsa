import { PrismaService } from '@/shared/database/prisma.service';
import { Organization } from '@/shared/entities/Organization';
import { Injectable } from '@nestjs/common';
import { OrganizationDto } from '../../dto/organization.dto';
import { IOrganizationRepository } from '../organization.repository';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: OrganizationDto, owner_id: string): Promise<Organization> {
    const { name, slug } = data;

    const organization = await this.prisma.organization.create({
      data: {
        name,
        slug,
        owner_id,
      },
    });

    return organization;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { slug },
    });

    return organization;
  }

  async findByOwner(owner_id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        owner_id,
      },
    });

    return organization;
  }

  async update(data: OrganizationDto, owner_id: string): Promise<Organization> {
    const { name, slug } = data;
    const organization = await this.prisma.organization.update({
      where: {
        owner_id,
      },
      data: {
        name,
        slug,
      },
    });
    return organization;
  }
  async delete(owner_id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.delete({
      where: {
        owner_id,
      },
    });

    return organization;
  }
}
