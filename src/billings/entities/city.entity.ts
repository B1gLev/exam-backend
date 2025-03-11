import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { PostalCode } from "./postalcode.entity";
import { Billing } from "./billing.entity";

@Entity("cities")
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Country, country => country.cities)
    @JoinColumn({ name: "country_id" })
    country: Country

    @OneToMany(() => PostalCode, postalCode => postalCode.city)
    postalCodes: PostalCode[];

    @OneToMany(() => Billing, (billing) => billing.city)
    billings: Billing[];
}
