import { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = OrderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);
    const { message, success, result: resultData } = result;

    res.status(200).json({
      success: success,
      message: message,
      data: resultData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getOrders = async (req: Request, res: Response) => {
  try {
    let message = '';
    const email = req.query.email;
    console.log(email);
    const result = await OrderServices.getProductsFromDB(email);
    if (email) {
      message = 'Orders fetched successfully for user email!';
    } else {
      message = 'Orders fetched successfully!';
    }
    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
