import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("setting")
export class SettingModel{
    @PrimaryGeneratedColumn()
    maintenance_status?: number
    
    @Column()
    maintenance_note?: string
    
    @Column()
    fee?: number

    @Column()
    version_app?: number
}