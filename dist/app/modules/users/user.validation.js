"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Base user validation schema
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        })
            .email("Invalid email format")
            .min(5, "Email must be at least 5 characters")
            .max(50, "Email cannot exceed 50 characters"),
        password: zod_1.z.string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password cannot exceed 100 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
        role: zod_1.z.enum(['user', 'admin'], {
            errorMap: () => ({ message: "Role must be either 'user' or 'admin'" })
        }).optional().default('user'),
    }),
});
// For updating user (makes all fields optional)
const updateUserValidationSchema = userValidationSchema.partial();
// For ObjectId validation
const userIdValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        userId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid user ID format",
        }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    updateUserValidationSchema,
    userIdValidationSchema,
};
