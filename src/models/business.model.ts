import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("business")
export class BusinessModel{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column({ default: "image.png" })
    image?: string
}