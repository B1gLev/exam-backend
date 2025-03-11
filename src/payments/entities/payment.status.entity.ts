import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('payment_status')
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments: Payment[];
}
