import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { CategoryModel } from "../models/category.model";


export class CategoryController {
    public async  getCategory(req: Request, res: Response){
        const categoryRepository = AppDataSource.getRepository(CategoryModel)
        
        const categoryData = await categoryRepository.find()
    
        try {
            res.status(200).send({
                data: categoryData,
                message: 'Succefully Get List Category'
            })
        } catch (err) {
            res.status(400).send({
                error: err,
                message: 'Something Went Wrong'
            })
        }
    
    }
}
