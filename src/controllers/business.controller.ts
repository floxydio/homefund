import { Request, Response } from "express"
import { AppDataSource } from "../database/orm";
import { BusinessModel } from "../models/business.model";

export class BusinessController {
    public async getBusiness(req: Request, res:Response){
        const businessRepository = AppDataSource.getRepository(BusinessModel)
        
        const businessData = await businessRepository.find()

        try{
            res.status(200).send({
                data: businessData,
                message: 'Susccesfully Get Business Data'
            })
        } catch (err) {
            res.status(400).send({
                error:err,
                message: 'Something Went Wrong'
            })
        }
    }

    public async postBusiness (req: Request, res: Response){
        const business = new BusinessModel()
        const businessRepository = AppDataSource.getRepository(BusinessModel)

        business.name = req.body.name
        business.image = req.file?.fieldname as string
        const resultData = businessRepository.save(business)

        return res.status(201).send({
            status:201,
            data: resultData,
            message: "Succesfully Create Business"
        })
    }
}