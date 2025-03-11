import { Payment } from "src/payments/entities/payment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("passes")
export class Pass {
    @PrimaryGeneratedColumn()
    id : number; 
    @Column()
    duration : number;
    @Column()
    price : number;

    @OneToMany(() => Payment, (payment) => payment.pass)
    payments: Payment[];
}
