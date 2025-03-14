import { PasswordReset } from "src/auth/entities/password-reset.entity"
import { Billing } from "src/billings/entities/billing.entity"
import { Payment } from "src/payments/entities/payment.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string
    
    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Billing, (billing) => billing.user)
    billings: Billing[];

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];

    @OneToMany(() => PasswordReset, (reset) => reset.user)
    passwordResets: PasswordReset[];
}
