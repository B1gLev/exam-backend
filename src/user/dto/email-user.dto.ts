import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}