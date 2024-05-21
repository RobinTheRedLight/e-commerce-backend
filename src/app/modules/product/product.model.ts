import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariants,
} from './product.interface';

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

const productSchema = new Schema<TProduct, ProductModel>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

productSchema.statics.isProductExists = async function (id: string) {
  const existingProduct = await Product.findOne({ id });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
