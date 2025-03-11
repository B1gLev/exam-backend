import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AccessTokenGuard)
  @Post("finish")
  async create(@Req() request: Request,  @Body() createPaymentDto: CreatePaymentDto) {
    const userId = request.user["sub"];
    return await this.paymentsService.create(userId, createPaymentDto);
  }
}
