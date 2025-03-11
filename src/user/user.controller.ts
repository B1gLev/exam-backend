import { Body, Controller, Get, HttpException, HttpStatus, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';
import { UpdateEmailDto } from './dto/email-user.dto';
import { UpdateNameDto } from './dto/update-name-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AccessTokenGuard)
    @Get("me")
    async getUsers(@Req() request: Request) {
        const userId = request.user["sub"];
        console.log(userId);
        const user = await this.userService.findById(userId, {
            relations: ["payments", "payments.pass", "billings", "billings.city", "billings.city.postalCodes"]
        });

        return {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "billings": user.billings,
            "payments": user.payments,
        }
    }

    @UseGuards(AccessTokenGuard)
    @Patch("email")
    async updateEmail(@Req() request: Request, @Body() updateEmailDto: UpdateEmailDto) {
        const userId = request.user["sub"];
        console.log(userId)
        const user = await this.userService.findById(userId);
        
        if (user.email === updateEmailDto.email) throw new HttpException(
            "Jelenleg ezt az e-amil címet használod.",
            HttpStatus.CONFLICT
        );

        await this.userService.updateEmail(userId, updateEmailDto.email);
        return {
            "message": "Sikeresen beállítottad az új e-mail címedet"
        }
    }

    @UseGuards(AccessTokenGuard)
    @Put("username")
    async updateName(@Req() request: Request, @Body() updateNameDto: UpdateNameDto) {
        const userId = request.user["sub"];
        await this.userService.updateName(userId, updateNameDto);
        return {
            "message": "Sikeresen frissítetted a felhasználó nevedet."
        }
    }
}

