import {Request, Response} from "express";
import { SettingModel } from "../models/setting.model";
import { AppDataSource } from "../database/orm";


export class SettingController {

    public async getSetting (req: Request, res: Response){
        const settingRepository = AppDataSource.getRepository(SettingModel)

        const settingData = await settingRepository.find()

        try{
            res.status(200).send({
                status: 200,
                data: settingData,
                message: "Successfully Get Data Setting"
            })
        } catch(err){
            res.status(400).send({
                error: err,
                message: "Something Went Wrong"
            })
        }

    }
}

