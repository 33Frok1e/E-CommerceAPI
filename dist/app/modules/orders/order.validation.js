"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string"
    }),
    productId: zod_1.z.string({
        required_error: "productId is required",
        invalid_type_error: "productId must be string"
    }),
    quantity: zod_1.z.number({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be number"
    }),
    price: zod_1.z.number({
        required_error: "price is required",
        invalid_type_error: "price must be number"
    })
});
exports.default = orderValidationSchema;
