import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { MailService } from '../vendor/mailer/mailer.client';
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
          email: req.body.email,
          status_validasi: Number(0),
          user_agent: String(""),
          username: req.body.username,
        }
      }).then(() => {
        let tokenSignUp = jwt.sign({
          data: {
            "email": req.body.email
          }
        },
          `emailVerif${req.body.email}`, { expiresIn: "2h" }
        )
        MailService("kontrakdana@gmail.com", `${req.body.email}`, "Email Verification", `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Confirm Account</title>

            <!-- font google -->

            <style>
              * {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: content-box;
              }
              .container {
                display: flex;
                justify-content: center;
              }
              .background {
                background-color: #f4f3f9;
                width: 100%;
              }

              .text-center {
                text-align: center;
              }

              .header {
                background-color: #216eee;
                height: 40vh;
              }

              .card {
                background-color: white;
                border: 1px solid rgb(183, 180, 180);
                margin-top: 60px;
                width: 100%;
                padding: 30px;
              }

              .title {
                width: 50%;
              }

              .footer {
                font-size: 15px;
                color: #818182;
              }

              /* Buat desktop */
              @media (max-width: 1000px) {
                .card {
                  width: 100%;
                }

                .title {
                  width: 90%;
                }
              }

              /* Buat tablet */
              @media (max-width: 678px) {
                .card {
                  margin: 0 auto;
                  width: 70%;
                }

                .card h2 {
                  font-size: 30px;
                }

                .card p {
                  font-size: 16px;
                }

                .title {
                  width: 100%;
                }

                .title a,
                p {
                  font-size: 15px;
                }

                .footer {
                  font-size: 12px;
                  color: #818182;
                }

                .card {
                  margin-top: 50px;
                }
              }

              /* Buat mobile */
              @media (max-width: 320px) {
                .card {
                  margin: 0 auto;
                  width: 70%;
                }

                .footer {
                  font-size: 12px;
                  color: #818182;
                }
              }
              .btn {
                background-color: #216eee;
                padding: 20px;
                color: white;
                width: 200px;
                font-size: 20px;
                cursor: pointer;
                border: 0px solid transparent;
                border-radius: 15px;
              }
            </style>
          </head>
          <body>
            <!-- Warna putih background -->
            <section class="background">
              <!-- Warna biru background -->
              <div class="header">
                <!-- Biar ketengah -->
                <div class="container">
                  <!-- Baris baru -->
                  <div class="row">
                    <!-- Kolom baru -->
                    <div class="col mb-4">
                      <!-- Card -->
                      <div class="card m-auto" style="margin-bottom: 50px">
                        <div class="card-body text-center">
                          <h2
                            class="card-title text-center mb-4"
                            style="margin-bottom: 50px"
                          >
                            Thanks For Sign Up
                          </h2>
                          <p
                            class="card-text text-start mb-4"
                            style="margin-bottom: 50px"
                          >
                            Hello,<br /><br />We're excited to have you get started.
                            First, you need to confirm your account. Just press the
                            button below.
                          </p>
                          <button
                            type="button"
                            class="btn btn-primary rounded-1"
                            style="margin-bottom: 80px"
                          >
                            Confirm Account
                          </button>
                          <p  style="margin-bottom: 40px">or Copy This Link Below : <b>http://localhost:3500/verify/${tokenSignUp}</b></p>
                          <p
                            class="card-text text-start mb-4 mt-4"
                            style="margin-bottom: 40px"
                          >
                            If you have any questions, just reply to this email - we're
                            always happy to help out.
                          </p>
                          <p
                            class="card-text text-start mt-4"
                            style="font-weight: bold; margin-bottom: 100px"
                          >
                            The KontrakDana Team
                          </p>
                        </div>
                      </div>
                      <!-- /Card -->
                    </div>
                    <!-- /Kolom baru -->
                  </div>
                  <!-- /Baris baru -->

                  <!-- Bagian bawah -->
                </div>
              </div>
            </section>
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

}
