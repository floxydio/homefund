import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { FAQModel } from "../models/faq.model";

export class FAQController {
     
    public async getFAQ (req: Request, res: Response){
        const FAQRepository = AppDataSource.getRepository(FAQModel)

        const faqData = await FAQRepository.find()

        try {
            return res.status(200).send({
                status: 200,
                data: faqData,
                message: "Successfully Get FAQ Data"
            })
        } catch (err) {
            return res.status(400).send({
                status: 400,
                error: err,
                message: "Something Went Wrong"
            })
        }
    }
}