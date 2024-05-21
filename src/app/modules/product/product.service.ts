import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getProductsFromDB = async (id?: string) => {
  console.log(id);
  if (id) {
    const result = await Product.findById({ _id: id });
    console.log(result);
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  deleteProductFromDB,
  updateProductInDB,
};
