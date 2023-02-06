import { Request, Response } from "express"
import { AppDataSource } from "../database/orm";
import { BusinessModel } from "../models/business.model";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

export class BusinessController {
    public async getBusiness(req: Request, res: Response) {
        // const businessRepository = AppDataSource.getRepository(BusinessModel)
        const prisma = new PrismaClient()
        const businessData = await prisma.business.findMany()

        try {
            res.status(200).send({
                data: businessData,
                message: 'Susccesfully Get Business Data'
            })
        } catch (err) {
            res.status(400).send({
                error: err,
                message: 'Something Went Wrong'
            })
        }
    }

    public async postBusiness(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            await prisma.business.create({
                data: {
                    name: req.body.name,
                    image: req.body.image
                }
            })
        }
        return res.send(201).send({
            status: 201,
            message: 'Succesfully Create Business'
        })
    }
}
