import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { InvestasiModel } from "../models/investasi.model";

export class InvestasiController {
    public async postInvestasi(req: Request, res: Response){
        const investasi = new InvestasiModel()
        const investasiRepository = AppDataSource.getRepository(InvestasiModel)

        investasi.price = req.body.price
        investasi.status = req.body.status
        investasi.item_id = req.body.item_id
        investasi.amount = req.body.amount
        investasi.createdAt = new Date()
        investasi.updatedAt = new Date()

        const resultData = investasiRepository.save(investasi)

        return res.status(201).send({
            status: 201,
            data: resultData,
            message: "Succefully Created Investasi"
        })

    }
}