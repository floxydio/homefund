import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CategoryModel{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    category?: string
}