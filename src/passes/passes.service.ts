import { Injectable } from '@nestjs/common';
import { Pass } from './entities/pass.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PassesService {

  constructor(
    @InjectRepository(Pass) private passRepository: Repository<Pass>,
  ) { }

  async findAll(): Promise<Pass[]> {
    return await this.passRepository.find()
  }

  async findById(id: number): Promise<Pass> {
    return this.passRepository.findOne({ where: { id }});
  }
}
