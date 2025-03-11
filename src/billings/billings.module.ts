import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { PostalCode } from './entities/postalcode.entity';
import { Billing } from './entities/billing.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Country, City, PostalCode, Billing]),
  ],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule { }
