import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class VirtualAccountModel{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    icon?: string

    @Column()
    vat?: number

    @Column()
    status?: number
}