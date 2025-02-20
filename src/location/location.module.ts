import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { PostalCode } from './entities/postalcode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, City, PostalCode]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule { }
