import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostalCode } from './entities/postalcode.entity';
import { UserService } from 'src/user/user.service';
import { Billing } from './entities/billing.entity';

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(PostalCode)
    private postalCodeRepository: Repository<PostalCode>,
    @InjectRepository(Billing) private billingRepository: Repository<Billing>, 
    private readonly userService: UserService,
  ) { }

  async create(email: string, createBillingDto: CreateBillingDto) {
    const result = await this.postalCodeRepository.find({
      where: {
        "postal_code": createBillingDto.postalCode,
        "city": {
          "name": createBillingDto.city,
          "country": {
            "name": createBillingDto.country
          } 
        },
      },
      relations: ['city', 'city.country']
    });

    if (result.length == 0) throw new HttpException(
      "Hibás irányítószámot vagy települést adtál meg.", 
      HttpStatus.BAD_REQUEST
    );   
    const city= result[0].city;
    const user = await this.userService.findByEmail(email);

    const billing = this.billingRepository.create({
      user: user,
      city: city,
      address: createBillingDto.address
    });
    await this.billingRepository.save(billing);

    return {
      message: "Sikeresen rögzítetted a számlázási adataidat.",
      id: billing.id
    };
  }

  async update(email: string, createBillingDto: CreateBillingDto) {
    const result = await this.postalCodeRepository.find({
      where: {
        "postal_code": createBillingDto.postalCode,
        "city": {
          "name": createBillingDto.city,
          "country": {
            "name": createBillingDto.country
          } 
        },
      },
      relations: ['city', 'city.country']
    });

    if (result.length == 0) throw new HttpException(
      "Hibás irányítószámot vagy települést adtál meg.", 
      HttpStatus.BAD_REQUEST
    );   
    const city= result[0].city;
    const user = await this.userService.findByEmail(email);

    await this.billingRepository.update({ user: { id: user.id}}, { city: city, address: createBillingDto.address});

    return {
      message: "Sikeresen frissítetted a számlázási adataidat.",
    };
  }
}
