// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";

// export class FAQController {

//     public async getFAQ (req: Request, res: Response){
//         const prisma = new PrismaClient()
//         const faqRepository = await prisma.faq.findMany()

//         try {
//             return res.status(200).send({
//                 status: 200,
//                 data: faqRepository,
//                 message: "Successfully Get FAQ Data"
//             })
//         } catch (err) {
//             return res.status(400).send({
//                 status: 400,
//                 error: err,
//                 message: "Something Went Wrong"
//             })
//         }
//     }
// }
