import { z } from 'zod';
import { Types } from 'mongoose';

// Base user validation schema
const userValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email cannot exceed 50 characters"),

    password: z.string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

    role: z.enum(['user', 'admin'] as const, {
      errorMap: () => ({ message: "Role must be either 'user' or 'admin'" })
    }).optional().default('user'),
  }),
});

// For updating user (makes all fields optional)
const updateUserValidationSchema = userValidationSchema.partial();

// For ObjectId validation
const userIdValidationSchema = z.object({
  params: z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid user ID format",
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
  userIdValidationSchema,
};