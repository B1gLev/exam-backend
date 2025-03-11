import { Controller, Get, Post, Body, Param, Req, UseGuards, Put } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @UseGuards(AccessTokenGuard)
  @Post("add")
  create(@Req() request: Request, @Body() createBillingDto: CreateBillingDto) {
    const email = request.user["email"];
    return this.billingsService.create(email, createBillingDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put("update")
  update(@Req() request: Request, @Body() createBillingDto: CreateBillingDto) {
    const email = request.user["email"];
    return this.billingsService.update(email, createBillingDto);
  }
}
