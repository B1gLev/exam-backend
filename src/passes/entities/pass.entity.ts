import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("passes")
export class Pass {
    @PrimaryGeneratedColumn()
    id : number; 
    @Column()
    duration : number;
    @Column()
    price : number;

}
