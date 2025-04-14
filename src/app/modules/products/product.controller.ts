import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { ProductServices } from "./product.services";

const createProduct =  async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const zodParser = productValidationSchema.parse(req.body)
        const result = await ProductServices.createAProductIntoDB(zodParser)
        res.status(200).json({
            success: true,
            message: "Product created succesfully!",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        })
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        // const result = await ProductServices.getProductsFromDB();

        const { searchTerm } = req.query;
        const result = await ProductServices.getProductsFromDB(searchTerm as string);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        });
    }
}

export const ProductControllers = {
    createProduct,
    getAllProducts
}