import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('billings')
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.billings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => City, (city) => city.billings)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  address: string;
}
