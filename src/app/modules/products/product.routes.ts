import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
router.post('/', ProductControllers.createProduct);

export const ProductRoutes = router;