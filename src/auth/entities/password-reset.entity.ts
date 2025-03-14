import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('password_resets')
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.passwordResets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  token: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;
}
