import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errorMessages = err.errors.map((issue) => ({
                message: `${issue.path.join('.')} is ${issue.message.toLowerCase()}`,
            }));
            throw new ApiError(400, "Invalid data", errorMessages);
        }
        throw new ApiError(500, "Internal Server Error");
    }
};

const signUpSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'a valid email' }),
        password: z.string().min(6, { message: 'at least 6 characters long' }),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'a valid email' }),
        password: z.string().min(1, { message: 'required' }),
    }),
});

export { validate, signUpSchema, loginSchema };
