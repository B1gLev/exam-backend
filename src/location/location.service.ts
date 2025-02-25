import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostalCode } from './entities/postalcode.entity';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(PostalCode)
    private postalCodeRepository: Repository<PostalCode>
  ) { }


  async find(locationDto: LocationDto) {
    if (locationDto.code.toString().length != 4 || !locationDto.code) throw new HttpException(
      "Wrong postal code",
      HttpStatus.BAD_REQUEST
    );

    const loc = await this.postalCodeRepository.find({
      where: {
        "postal_code": locationDto.code
      },
      relations: ['city', 'city.country']
    });
  }
}
