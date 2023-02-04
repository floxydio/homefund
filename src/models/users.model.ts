import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity("users")
export class UserModel extends BaseEntity {
   @PrimaryGeneratedColumn()
   id?: number

   @Column()
   name?: string

   @Column({ unique: true })
   username?: string

   @Column()
   password?: string

   @Column({ default: "profile.png" })
   profile_image?: string

   @Column({default: 0})
   invesment_amount?: number

   @Column({default: 0})
   status_validasi?: number

   @Column()
   user_agent?: string
}

