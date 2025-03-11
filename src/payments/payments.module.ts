import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './entities/payment.status.entity';
import { Method } from './entities/method.entity'; 
import { UserModule } from 'src/user/user.module';
import { PassesModule } from 'src/passes/passes.module';

@Module({
  imports: [
    UserModule,
    PassesModule,
    TypeOrmModule.forFeature([Payment, PaymentStatus, Method]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
