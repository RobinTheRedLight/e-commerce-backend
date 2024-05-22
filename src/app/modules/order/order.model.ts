import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'E-mail is required'],
  },
  productId: {
    type: String,
    trim: true,
    required: [true, 'Product Id is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    min: 1,
    required: [true, 'Quantity is required'],
  },
});

export const Order = model<TOrder>('Order', OrderSchema);
