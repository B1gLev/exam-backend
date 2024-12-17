import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPair } from './interfaces/token-pair.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<TokenPair> {
    const existingUser = await this.userService.findByEmail(registerUserDto.email);
    if (existingUser) throw new HttpException(
      "User already exists",
      HttpStatus.CONFLICT
    );

    const user = await this.userService.create(registerUserDto);
    return await this.getTokens(user.id, user.email);
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
    return await this.getTokens(user.id, user.email);
  }

  async getTokens(userId: number, email: string): Promise<TokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: "30d",
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken
    }
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      if (payload.sub !== userId) throw new HttpException(
        "Invalid payload", 
        HttpStatus.BAD_REQUEST
      );
      return await this.getTokens(userId, payload.email);
    } catch {
      throw new HttpException(
        "Refresh token is invalid or expired", 
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
