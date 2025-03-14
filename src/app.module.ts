import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PassesModule } from './passes/passes.module';
import { Pass } from './passes/entities/pass.entity';
import { Country } from './billings/entities/country.entity';
import { City } from './billings/entities/city.entity';
import { PostalCode } from './billings/entities/postalcode.entity';
import { BillingsModule } from './billings/billings.module';
import { Billing } from './billings/entities/billing.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { PaymentStatus } from './payments/entities/payment.status.entity';
import { Method } from './payments/entities/method.entity';
import { PasswordReset } from './auth/entities/password-reset.entity';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      logging: true,
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Pass, Country, City, PostalCode, Billing, Payment, PaymentStatus, Method, PasswordReset],
      synchronize: false,
    }),
    UserModule,
    PassesModule,
    BillingsModule,
    PaymentsModule
  ],
  providers: [MailService],
})
export class AppModule {}
