import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
  },
  variants: {
    type: [variantsSchema],
    required: [true, 'Variants are required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory is required'],
  },
});

export const Product = model<TProduct>('Product', productSchema);
