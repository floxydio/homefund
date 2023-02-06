import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { MailService } from '../vendor/mailer/mailer.client';
import path from 'path';
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
          phone_number: req.body.phone,
          invesment_amount: req.body.invesment_amount,
          email: req.body.email,
          status_validasi: Number(0),
          user_agent: String(""),
          username: req.body.username,
        }
      }).then((value) => {
        let tokenSignUp = jwt.sign({
          data: {
            "id": value.id,
            "email": req.body.email
          }
        },
          `emailVerif`, { expiresIn: "1h" }
        )
        MailService("kontrakdana@gmail.com", `${req.body.email}`, "Email Verification", `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        font-family: sans-serif;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Thanks for register your Account</h1>
    <br />
    <h3>Hello, ${req.body.name}</h3>
    <br />
    <p>This is your verification Link <a href="http://192.168.43.110:3500/verify/${tokenSignUp}">Click Here</a></p>
    <br />
    <b>KontrakDanaTeam</b>
</body>
</html>
`)
        return res.status(201).send({
          status: 201,
          message: "Succesfully Create Account",
        });
      }).catch(() => {
        return res.status(400).send({
          status: 400,
          message: "Cannot Create Account",
        });
      })


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

  public async Verification(req: Request, res: Response) {
    const prisma = new PrismaClient()

    jwt.verify(req.params.params, `emailVerif`, async function (err: any, decoded: any) {
      if (err) {
        console.log(err)
      } else {
        console.log(decoded)
        await prisma.users.update({
          where: {
            id: Number(decoded.data.id)
          },
          data: {
            status_validasi: 1,
          }
        })
        return res.sendFile(path.resolve("src/views/verify.html"));

      }
    })
    // let tokenVerif = jwt.sign()
  }

}
