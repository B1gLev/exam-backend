import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBillingDto {
    @IsNotEmpty()
    @IsString()
    country: string
    
    @IsNotEmpty()
    @IsNumber()
    postalCode: number

    @IsNotEmpty()
    @IsString()
    city: string
    
    @IsNotEmpty()
    @IsString()
    address: string
}
