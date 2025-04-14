import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { Product } from "../products/product.model";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const zodValidations = orderValidationSchema.safeParse(req.body);
        
        if (!zodValidations.success) {
            const errorLists = zodValidations.error.issues.map((err) => err.message);
            return res.status(400).json({
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

        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;

        const [updatedProduct, newOrder] = await Promise.all([
            product.save(),
            OrderServices.createANewOrder(zodValidations.data)
        ]);

        return res.status(200).json({
            success: true,
            message: "Order placed successfully!",
            data: newOrder
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        });
    }
}

const handleGetAllOrders = async (req: Request, res: Response) => {
    const email = req.query.email
    try {
        const orders = await OrderServices.getAllOrdersFromDB(email as string | undefined);
        if(orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Orders found for this email",
                data: []
            })
        };

        return res.status(200).json({
            success:true,
            message: "Orders founded succesfully!",
            data: orders
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        });
    }
}


export const OrderController = {
    createOrder,
    handleGetAllOrders
}