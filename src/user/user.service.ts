import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { UpdateNameDto } from './dto/update-name-user.dto';

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

    async findById(id: number, options?: FindOneOptions<User>): Promise<User> {
      return this.userRepository.findOne({ where: { id }, ...options });
    } 

    async updateEmail(userId: number, newEmail: string): Promise<UpdateResult> {
      return await this.userRepository.update({ id: userId}, { email: newEmail })
    }

    async updateName(userId: number, updateNameDto: UpdateNameDto): Promise<UpdateResult> {
      return await this.userRepository.update({ id: userId}, { firstName: updateNameDto.firstName, lastName: updateNameDto.lastName })
    }

    async updatePassword(userId: number, newPassword: string): Promise<UpdateResult> {
      return await this.userRepository.update({ id: userId}, { password: newPassword })
    }
}
