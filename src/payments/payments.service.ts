import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PassesService } from 'src/passes/passes.service';
import { Method } from './entities/method.entity';
import { PaymentStatus } from './entities/payment.status.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Method) private methodRepository: Repository<Method>,
    @InjectRepository(PaymentStatus) private paymentStatusRepository: Repository<PaymentStatus>,
    private readonly userService: UserService,
    private readonly passService: PassesService,
  ) { }


  async create(userId: number, createPaymentDto: CreatePaymentDto) {
    const user = await this.userService.findById(userId);
    const pass = await this.passService.findById(createPaymentDto.passId);
    if (!pass) throw new HttpException(
      "Nem létezik ilyen bérlet.",
      HttpStatus.BAD_REQUEST
    );

    const method = await this.methodRepository.findOneBy({ id: createPaymentDto.methodId });
    if (!method) throw new HttpException(
      "Helytelen fizetési módot adtál meg.",
      HttpStatus.BAD_REQUEST
    );
    
    const paymentStatus = await this.paymentStatusRepository.findOneBy({ id: 3 });

    const newPayment = this.paymentRepository.create({
      user: user,
      pass: pass,
      method: method,
      paymentStatus: paymentStatus,
      date: new Date(),
      autorenewer: createPaymentDto.autorenewer
    })

    await this.paymentRepository.save(newPayment);
    return {
      message: "Sikeres tranzakció."
    }
  }

}
