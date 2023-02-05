import { Request, Response } from "express";
import { AppDataSource } from "../database/orm";
import { CategoryModel } from "../models/category.model";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

export class CategoryController {
    public async  getCategory(req: Request, res: Response){
        const categoryRepository = AppDataSource.getRepository(CategoryModel)
        const prisma = new PrismaClient()
        const categoryData = await prisma.category.findMany()
    
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

    public async postCategory(req: Request, res: Response){
        const prisma = new PrismaClient();
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            await prisma.category.create({
                data: {
                    category: req.body.category,
                    icon:   req.body.icon
                }
            })
        }
        return res.status(201).send({
            status: 201,
            message: "Succesfully Create Category"
        })
    } 
}
