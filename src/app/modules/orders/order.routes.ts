import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder as any)
router.get('/', OrderController.handleGetAllOrders as any)

export const OrderRoutes = router;