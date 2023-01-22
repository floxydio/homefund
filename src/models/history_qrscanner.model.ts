import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity("history_qrscanner")
export class HistoryModel{
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  userid?: number

  @Column()
  result?: string

  @Column()
  createdate?: Date
}