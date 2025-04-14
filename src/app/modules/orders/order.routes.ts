// order.routes.ts
import express from 'express';
import { OrderControllers } from './order.controllers';

const router = express.Router();

router.post('/', OrderControllers.createOrder);

export const OrderRoutes = router;