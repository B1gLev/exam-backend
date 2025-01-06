import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PassesService } from './passes.service';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('passes')
export class PassesController {
  constructor(private readonly passesService: PassesService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getPasses(){
    return await this.passesService.findAll();
  }
}
