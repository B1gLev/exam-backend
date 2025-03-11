import { Pass } from "src/passes/entities/pass.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Method } from "./method.entity";
import { PaymentStatus } from "./payment.status.entity";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Pass, (pass) => pass.payments)
  @JoinColumn({ name: 'pass_id' })
  pass: Pass;

  @ManyToOne(() => Method, (method) => method.payments)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @ManyToOne(() => PaymentStatus, (paymentStatus) => paymentStatus.payments)
  @JoinColumn({ name: 'payment_status_id' })
  paymentStatus: PaymentStatus;

  @Column()
  date: Date;

  @Column({ default: false })
  autorenewer: boolean;
}