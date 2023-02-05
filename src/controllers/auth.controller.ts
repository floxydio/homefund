import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'

export class AuthController {

  public async SignIn(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const resultData = await prisma.users.findMany()

    let resultBcrypt = bcrypt.compareSync(req.body.password, resultData[0].password);
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
      await prisma.users.update({
        where: {
          id: Number(resultData[0].id)
        },
        data: {
          user_agent: String(req.headers["user-agent"])
        }
      })
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
    const prisma = new PrismaClient()
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      await prisma.users.create({
        data: {
          name: req.body.name,
          password: hash,
          invesment_amount: req.body.invesment_amount,
          status_validasi: Number(req.body.status_validasi),
          user_agent: String(""),
          username: req.body.username,
        }
      })

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
