import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { BaseAuthDto } from "./base-auth.dto";

export class RegisterUserDto extends BaseAuthDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    firstName: string
    
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    lastName: string

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}