import { Controller, Get, UseGuards } from '@nestjs/common';
import { PassesService } from './passes.service';
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
