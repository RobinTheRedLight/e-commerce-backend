import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/products/:productId?', ProductControllers.getProducts);

router.delete('/products/:productId', ProductControllers.deleteProduct);

router.put('/products/:productId', ProductControllers.updateProduct);

export const ProductRoutes = router;
