import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private userRepository: Repository<User>, 
    ) {}

    async create(registerUserDto: RegisterUserDto): Promise<User> {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      const user = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword
      });
      await this.userRepository.save(user);
      return user;
    }

    async findByEmail(email: string): Promise<User> {
      return await this.userRepository.findOneBy({ email: email});
    }
}
