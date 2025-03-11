import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity("country")
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => City, city => city.country)
    cities: City[]
}
