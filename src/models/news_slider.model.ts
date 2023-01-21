import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("news_slider")

export class NewsSliderModel {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    detail?: string

    @Column()
    image?: string

    @Column()
    status?: number
}