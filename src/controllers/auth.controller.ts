import { Request, Response } from "express";
import { AppDataSource } from "../database/orm"
import { UserModel } from "../models/users.model" // const userModel = require("../models/users.model") -> JS
import bcrypt from "bcrypt" // -> const bcrypt = require("bcrypt") -> JS


export async function SignIn(req: Request, res: Response) {
   const userRepository = AppDataSource.getRepository(UserModel) // -> Wajib Dipanggil untuk Repository

   const resultData = await userRepository.find({
      where: {
         username: req.body.username
      }
   }) // User Login ngetik -> Username & Password
   let resultBcrypt = bcrypt.compareSync(req.body.password, resultData[0].password!); // Untuk cek dari req.body.password dengan tabel database password

   // Jika ResultBcrypt == true -> Benar / Sesuai, false -> Salah
   if (resultBcrypt) {
      return res.status(200).send("Succesfully Login")
   } else {
      return res.status(400).send("Username or Password Incorrect")
   }
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
