import bcrypt, { hash } from 'bcrypt';
import { UserModel } from './../models/users.model';
import { AppDataSource } from '../database/orm';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'


export class AuthController {

  public async SignIn(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserModel)
    console.log(req.body.username)
    console.log(req.body.password)
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
        "secret", { expiresIn: '30s' }
        );
      userRepository.createQueryBuilder().update(UserModel).set({
        user_agent: req.headers['user-agent']
      }).where("username = :username", {username: req.body.username}).execute()
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

  public async SignUp(req: Request, res: Response) {

    const user = new UserModel()
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userRepository = AppDataSource.getRepository(UserModel)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      user.name = req.body.name
    user.password = hash
    user.username = req.body.username
    const resultData = userRepository.save(user);

    return res.status(201).send({
      status: 201,
      message: "Succesfully Create Account",
    });
  }
  }

  public async TokenCheck(req: Request, res: Response) {
    const { token } = req.body
    jwt.verify(token, "secret", function (err: any, decoded: any) {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Token is Expired"
        })
      } else {
        return res.status(200).json({
          status: 200,
          message: "Token is Authorized"
        })
      }
    })
  }

  public async Logout(req: Request, res: Response) { }

  public async EditProfile(req: Request, res: Response) { }

  public async ProfileCheck(req: Request, res: Response) { }

}
