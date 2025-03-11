import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty()
    passId: number;

    @IsNumber()
    @IsNotEmpty()
    methodId: number;

    @IsNotEmpty()
    autorenewer: boolean;
}
