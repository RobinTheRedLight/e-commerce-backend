import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error('Product already exists!');
  }
  const result = await Product.create(productData);
  return result;
};

const getProductsFromDB = async (name?: string) => {
  if (name) {
    const result = await Product.aggregate([{ $match: { name } }]);
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const deleteProductFromDB = async (name: string) => {
  const result = await Product.updateOne({ name }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  deleteProductFromDB,
};
