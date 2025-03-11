import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateNameDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    firstName: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    lastName: string
}