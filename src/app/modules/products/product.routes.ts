import express from 'express';
import { ProductControllers } from './product.controller';
import { verifyToken } from '../../middleware/authMiddleware';
const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
router.post('/', verifyToken, ProductControllers.createProduct);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', verifyToken, ProductControllers.updateProduct);
router.delete('/:productId', verifyToken, ProductControllers.deleteProduct);

export const ProductRoutes = router;