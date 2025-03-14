import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { TokenPair } from './interfaces/token-pair.interface';
import { ForgotPasswordDto } from './dto/forgot-password-auth.dto';
import { PasswordReset } from './entities/password-reset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password-auth.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(PasswordReset) private passwordResetRepository: Repository<PasswordReset>,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<TokenPair> {
    const existingUser = await this.userService.findByEmail(registerUserDto.email);
    if (existingUser) throw new HttpException(
      "Ezzel az e-mail címmel már regisztráltak.",
      HttpStatus.CONFLICT
    );

    const user = await this.userService.create(registerUserDto);
    return await this.getTokens(user.id, user.email);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) throw new HttpException(
      "Helytelen e-mail címet vagy jelszó párost adtál meg.",
      HttpStatus.BAD_REQUEST
    );

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) throw new HttpException(
      "Helytelen e-mail címet vagy jelszó párost adtál meg.",
      HttpStatus.BAD_REQUEST
    );
    console.log(user);
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
        "Hibás",
        HttpStatus.BAD_REQUEST
      );
      return await this.getTokens(userId, payload.email);
    } catch {
      throw new HttpException(
        "Refresh token helytelen vagy lejárt.",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    console.log(user);
    if (!user) throw new HttpException(
      "Hiba történt a kérés során.",
      HttpStatus.BAD_REQUEST
    );
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000);

    const newPasswordrequest = this.passwordResetRepository.create({
      user: user,
      token: token,
      expiresAt: expiresAt,
    });
    await this.passwordResetRepository.save(newPasswordrequest);
    await this.mailService.sendMail(
      user.email, 
      "Elfelejtett jelszó", 
      "http://127.0.0.1:5500/exampassword/passwordreset.html?t=" + token + "&e=" + expiresAt.getTime()
    )
    return {
      token: token,
      expiresAt: expiresAt.getTime()
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetRequest = await this.passwordResetRepository.findOne({
      where: { token: resetPasswordDto.token },
      relations: ['user'],
    });
    if (!resetRequest) throw new HttpException(
      "A kérés lejárt vagy érvénytelen.",
      HttpStatus.BAD_REQUEST
    );
    if (resetRequest.expiresAt < new Date()) {
      await this.passwordResetRepository.delete({ id: resetRequest.id });
      throw new HttpException(
        "A kérés lejárt vagy érvénytelen.",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.passwordResetRepository.delete({ id: resetRequest.id });
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.userService.updatePassword(resetRequest.user.id, hashedPassword);
    return {
      message: "Sikeresen megváltoztattad a jelszavadat."
    }
  }
}
