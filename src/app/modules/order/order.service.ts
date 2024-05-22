import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const id = orderData.productId.toString();
  // Extract the quantity from the order data.
  const orderQuantity = orderData.quantity;
  // Check if the product exists in the database.
  const existData = await Product.findById({ _id: id });
  if (existData) {
    // Get the current inventory quantity.
    const quantity = existData.inventory.quantity;
    // Check if there is enough inventory to fulfill the order.
    if (quantity > 0 && quantity >= orderQuantity) {
      const result = await Order.create(orderData);
      // Update the inventory quantity.
      const updatingQuantity = await Product.findByIdAndUpdate(id, {
        'inventory.quantity': quantity - orderQuantity,
      });
      // Fetch the updated product data.
      const newExistData: any = await Product.findById({ _id: id });
      // Get the new inventory quantity.
      const newQuantity = newExistData.inventory.quantity;
      console.log(newQuantity);
      // Update the inStock status if quantity is 0.
      if (newQuantity === 0) {
        const updatingStock = await Product.findByIdAndUpdate(id, {
          'inventory.inStock': false,
        });
      }
      return { result, message: 'Order created successfully', success: 'true' };
    }
    return {
      result: null,
      message: 'Insufficient quantity available in inventory',
      success: 'false',
    };
  }
  return { result: null, message: 'Order not found', success: 'false' };
};

const getProductsFromDB = async (email: any) => {
  if (email) {
    const result = await Order.find({ email: email });
    if (result.length !== 0) {
      return {
        success: 'true',
        messageData: 'Orders fetched successfully for user email!',
        resultData: result,
      };
    }
    return { success: 'false', messageData: 'Order not found', resultData: '' };
  }
  const result = await Order.find();
  return {
    success: 'true',
    messageData: 'Orders fetched successfully!',
    resultData: result,
  };
};

export const OrderServices = {
  createOrderIntoDB,
  getProductsFromDB,
};
