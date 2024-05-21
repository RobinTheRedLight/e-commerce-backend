import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
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

const getProducts = async (req: Request, res: Response) => {
  try {
    const { productName } = req.params;
    let result;
    let message;

    if (productName) {
      result = await ProductServices.getProductsFromDB(productName);
      message = 'Product is retrieved successfully';
    } else {
      result = await ProductServices.getProductsFromDB();
      message = 'Products are retrieved successfully';
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productName } = req.params;

    const result = await ProductServices.deleteProductFromDB(productName);

    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
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

export const ProductControllers = {
  createProduct,
  getProducts,
  deleteProduct,
};
