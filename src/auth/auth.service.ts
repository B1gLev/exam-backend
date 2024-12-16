import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, 
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userService.findByEmail(registerUserDto.email);
    console.log(existingUser);
    
    if (existingUser) throw new HttpException(
      "User already exists", 
      HttpStatus.CONFLICT
    );
    
    await this.userService.create(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) throw new HttpException(
      "Wrong credentials", 
      HttpStatus.BAD_REQUEST
    );

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) throw new HttpException(
      "Wrong credentials", 
      HttpStatus.BAD_REQUEST
    );
  }
}
