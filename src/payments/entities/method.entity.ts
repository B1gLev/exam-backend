import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('methods')
export class Method {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @OneToMany(() => Payment, (payment) => payment.method)
  payments: Payment[];
}
