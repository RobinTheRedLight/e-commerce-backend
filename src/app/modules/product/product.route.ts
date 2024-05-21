import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/products', ProductControllers.getProducts);

router.get('/products/:productId?', ProductControllers.getProduct);

router.delete('/products/:productId', ProductControllers.deleteProduct);

router.put('/products/:productId', ProductControllers.updateProduct);

export const ProductRoutes = router;
