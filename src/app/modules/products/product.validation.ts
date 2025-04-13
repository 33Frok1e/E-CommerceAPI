import { z } from 'zod'

export const variantValidationSchema = z.object({
    type: z.string(),
    value: z.string()
});

export const inventoryValidationSchema = z.object({
    quantity: z.number(),
    inStock: z.boolean()
});

const productValidationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be letter"
    }),
    description: z.string(),
    price: z.number().positive(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(variantValidationSchema),
    inventory: z.array(inventoryValidationSchema)
});

export default productValidationSchema;