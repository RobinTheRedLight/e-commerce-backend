import { z } from 'zod';

export const OrderValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'E-mail is required')
    .trim(),
  productId: z.string().min(1, 'Product Id is required').trim(),
  price: z
    .number()
    .min(0, 'Price is required and it should be in a positive number'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});
