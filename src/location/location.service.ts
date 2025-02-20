import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { PostalCode } from './entities/postalcode.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(PostalCode)
    private countryRepository: Repository<PostalCode>
  ) {}


  async findAll() {
    return await this.countryRepository.find({ relations: ['city', 'city.country'] });
  }
}
