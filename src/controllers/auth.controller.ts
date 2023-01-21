import bcrypt, { hash } from 'bcrypt';
import { UserModel } from './../models/users.model';
import { AppDataSource } from './../../kontrakdana-be/src/database/orm';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export async function SignIn(req: Request, res: Response) { 
  const userRepository = AppDataSource.getRepository(UserModel)

  const resultData = await userRepository.find({
    where: {
      username: req.body.username
    }
  });
  let resultBcrypt = bcrypt.compareSync(req.body.password, resultData[0].password!);

  if (resultBcrypt) {
    let token = jwt.sign(
      {
        data: {
          id: resultData[0].id,
          username: resultData[0].username,
        },
      },
      "secret", { expiresIn: '1h' }
    );
    return res.status(200).send({
      data: {
        id: resultData[0].id,
        username: resultData[0].username,
        name: resultData[0].name,
      },
      token: token,
    });
  } else {
    res.status(400).send({
      message: "Username or Password Invalid",
    });
  }
}

export async function SignUp(req: Request, res: Response) { 
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const userRepository = AppDataSource.getRepository(UserModel)
  const resultData = userRepository.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
  });

res.status(201).send({
  status: 201,
  data: resultData,
  message: "Succesfully Create Account",
});
  
}

export function Logout(req: Request, res: Response) { }

export function EditProfile(req: Request, res: Response) { }

export function ProfileCheck(req: Request, res: Response) { }
