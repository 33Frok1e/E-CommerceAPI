import { z } from 'zod';

const orderValidationSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string"
    }),
    productId: z.string({
        required_error: "productId is required",
        invalid_type_error: "productId must be string"
    }),
    quantity: z.number({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be number"
    }),
    price: z.number({
        required_error: "price is required",
        invalid_type_error: "price must be number"
    })
});

export default orderValidationSchema;