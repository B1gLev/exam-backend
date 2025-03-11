import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity("postal_codes")
export class PostalCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postal_code: number;

    @ManyToOne(() => City, city => city.postalCodes)
    @JoinColumn({ name: 'city_id' })
    city: City;
}
