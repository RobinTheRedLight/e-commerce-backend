import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const id = orderData.productId.toString();
  const orderQuantity = orderData.quantity;
  const existData = await Product.findById({ _id: id });
  if (existData) {
    const quantity = existData.inventory.quantity;
    if (quantity > 0 && quantity >= orderQuantity) {
      const result = await Order.create(orderData);
      const updatingQuantity = await Product.findByIdAndUpdate(id, {
        'inventory.quantity': quantity - orderQuantity,
      });
      const newExistData: any = await Product.findById({ _id: id });
      const newQuantity = newExistData.inventory.quantity;
      console.log(newQuantity);
      if (newQuantity === 0) {
        const updatingStock = await Product.findByIdAndUpdate(id, {
          'inventory.inStock': false,
        });
      }
      return result;
    }
    return 'Insufficient quantity available in inventory';
  }
  return 'Order not found';
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
