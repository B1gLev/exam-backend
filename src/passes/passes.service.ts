import { Injectable } from '@nestjs/common';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { Pass } from './entities/pass.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PassesService {

  constructor(
    @InjectRepository(Pass) private passRepository: Repository<Pass>,
  ){}

  async findAll(): Promise<Pass[]> {
    return await this.passRepository.find()
  }
  
  async findOne(id: number): Promise<Pass> {
    return await this.passRepository.findOneBy({id: id})
  }

}
