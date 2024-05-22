import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getProductsFromDB = async (email: any) => {
  if (email) {
    const result = await Order.find({ email: email });
    return result;
  }
  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getProductsFromDB,
};
