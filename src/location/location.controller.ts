import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}


  @Get()
  async findAll(@Query() locationDto: LocationDto) {
    return await this.locationService.find(locationDto);
  }
}
