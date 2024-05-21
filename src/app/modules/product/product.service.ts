import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getProductsFromDB = async (searchTerm: any) => {
  if (searchTerm) {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return result;
  }
  const result = await Product.find(searchTerm);
  return result;
};

const getProductFromDB = async (id: string) => {
  const result = await Product.findById({ _id: id });
  return result;
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
  getProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
};
