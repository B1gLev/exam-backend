import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const tokens = await this.authService.login(loginUserDto);
    return { "message": "Success", tokens };
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
