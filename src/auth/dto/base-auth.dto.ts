import { IsEmail, IsNotEmpty } from "class-validator"

export class BaseAuthDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
