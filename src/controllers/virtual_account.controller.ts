import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { VirtualAccountModel } from "../models/virtual_account.model";

export async function getVirtualAccount(req:Request, res: Response) {
    const virtualAccountRepository = AppDataSource.getRepository(VirtualAccountModel)

    const virtualAccountData = await virtualAccountRepository.find()

    try {
        res.status(200).send({
            data: virtualAccountData,
            message: "Berhasil Mendapatkan List Virtual Account"
        })
    } catch (err) {
        res.status(400).send({
            error: err,
            message: 'Something Went Wrong'
        })
        
    }
}