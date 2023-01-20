import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class UserModel {
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

}

// Test

// Test Nambahin
