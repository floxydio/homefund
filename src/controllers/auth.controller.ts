import { Request, Response } from "express";
import { AppDataSource } from "../database/orm"
import { UserModel } from "../models/users.model"

export async function SignIn(req: Request, res: Response) {
   // const userRepository = AppDataSource.getRepository(UserModel)


   // await userRepository.find({
   //    where: {
   //       name: req.body.name
   //    }
   // }).catch((error) => {
   //    return res.status(400).send(error)
   // }).then((data) => {
   //    return res.send(data)
   // })


}

export async function SignUp(req: Request, res: Response) {
   // const userRepository = AppDataSource.getRepository(UserModel)

   // await userRepository.create({
   //    name: req.body.name,
   //    password: req.body.password,
   //    profile_image: req.body.profile_image
   // })
}

export async function Logout(req: Request, res: Response) { }

export async function EditProfile(req: Request, res: Response) { }

export async function ProfileCheck(req: Request, res: Response) { }
