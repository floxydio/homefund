import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("faq")
export class FAQModel {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    question?: string

    @Column()
    answer?: string
}