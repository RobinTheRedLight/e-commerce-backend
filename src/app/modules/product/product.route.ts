import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getProducts);

router.get('/:productId?', ProductControllers.getProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

router.put('/:productId', ProductControllers.updateProduct);

export const ProductRoutes = router;
