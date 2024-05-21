import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/:productId?', ProductControllers.getProducts);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
