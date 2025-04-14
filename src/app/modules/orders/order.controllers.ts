import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { Product } from "../products/product.model";
import { OrderServices } from "./order.services";


const createOrder = async (req: Request, res: Response) => {
    try {
        // Zod Validation
        const zodValidations = orderValidationSchema.safeParse(req.body);
        
        if (!zodValidations.success) {
            const errorLists = zodValidations.error.issues.map((err) => err.message);
            return res.status(400).json({  // Changed from 500 to 400 for validation errors
                success: false,
                message: "Validation Error",
                errors: errorLists 
            });
        }

        const { productId, quantity } = zodValidations.data;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.inventory.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            });
        }

        // Update product inventory
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        
        // Save product and create order
        const [updatedProduct, newOrder] = await Promise.all([
            product.save(),
            OrderServices.createANewOrder(zodValidations.data)
        ]);

        res.status(200).json({
            success: true,
            message: "Order placed successfully!",
            data: newOrder
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        });
    }
}


export const OrderControllers = {
    createOrder
}