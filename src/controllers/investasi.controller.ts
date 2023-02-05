// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// import { validationResult } from "express-validator";

// export class InvestasiController {
//     public async postInvestasi(req: Request, res: Response) {
//         const prisma = new PrismaClient();
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             })
//         } else {
//             await prisma.investasi.create({
//                 data: {
//                     price: req.body.price,
//                     status: Number(req.body.status),
//                     item_id: req.body.item_id,
//                     amount: req.body.amount,
//                     createdAt: new Date(),
//                     updatedAt: new Date()

//                 }
//             })
//         }

//         return res.status(201).send({
//             status: 201,
//             message: "Succefully Created Investasi"
//         })

//     }
// }



