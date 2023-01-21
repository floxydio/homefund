import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("category")
export class CategoryModel{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    category?: string

    @Column()
    icon?: string
}