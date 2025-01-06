import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AccessTokenGuard)
    @Get("me")
    async getUsers(@Req() request: Request){
        const email = request.user["email"];
        const users = await this.userService.findByEmail(email);

        return {
            "firstName": users.firstName,
            "lastName": users.lastName,
            "email": users.email
        }
    }
}

