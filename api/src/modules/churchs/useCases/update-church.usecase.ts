import { Injectable, NotFoundException } from '@nestjs/common';
import { IChurchRepository } from '../repositories/church.repository';
import { UpdateChurchDto } from '../dto/update-church.dto';

@Injectable()
export class UpdateChurchUseCase {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(id: string, data: UpdateChurchDto) {
    const church = await this.churchRepository.findUnique(id);

    if (church) {
      throw new NotFoundException('Church already exists');
    }

    return await this.churchRepository.update(id, data);
  }
}
