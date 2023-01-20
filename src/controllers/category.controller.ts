import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { CategoryModel } from "../models/category.model";

export async function getCategory(req: Request, res: Response){
    const categoryRepository = AppDataSource.getRepository(CategoryModel)
    
    const categoryData = categoryRepository.find({
       relations: ['category']
    })

    try {
        res.status(200).send({
            data: categoryData,
            message: 'Berhasil Mendapatkan List Category'
        })
    } catch (err) {
        res.status(400).send({
            error: err,
            message: 'Something Went Wrong'
        })
    }

}