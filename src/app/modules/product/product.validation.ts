import { z } from 'zod';

const variantsSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const inventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .min(0, 'Quantity is required and the value should be in integer'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  price: z
    .number()
    .positive('Price must be required and it should be in a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'Tags are required'),
  variants: z.array(variantsSchema).min(1, 'Variants are required'),
  inventory: inventorySchema,
  isDeleted: z.boolean().optional().default(false),
});

export default productValidationSchema;
