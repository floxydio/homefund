import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity("investasi")

export class InvestasiModel {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    user_id?: number
    
    @Column()
    price?: number

    @Column()
    status?: number

    @Column()
    item_id?: number

    @Column()
    amount?: number

    @Column()
    createdAt?: Date

    @Column()
    updatedAt?: Date
}