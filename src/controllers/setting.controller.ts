import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"


export class SettingController {

    public async getSetting(req: Request, res: Response) {
        const prisma = new PrismaClient()
        const settingRepository = await prisma.setting.findFirst()
        try {
            res.status(200).send({
                status: 200,
                data: settingRepository,
                message: "Successfully Get Data Setting"
            })
        } catch (err) {
            res.status(400).send({
                error: err,
                message: "Something Went Wrong"
            })
        }

    }
}

