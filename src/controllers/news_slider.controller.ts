import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { NewsSliderModel } from "../models/news_slider.model";

export class NewsSliderController {

    public async getNewsSlider (req: Request, res: Response){
     const prisma = new PrismaClient()
     let newsSliderRepository = await prisma.news_slider.findMany()


        try {
            res.status(200).send({
                status: 200,
                data: newsSliderRepository,
                message: "Successfully Get List News"
            })
        } catch (err) {
            res.status(400).send({
                status: 400,
                error: err,
                message: "Something Went Wrong"
            })
        }
    }
}