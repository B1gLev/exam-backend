import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.register(registerUserDto);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    await this.authService.login(loginUserDto);
    return { "message": "Success"};
  }
}
