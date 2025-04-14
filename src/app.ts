import express from "express";
import cors from 'cors';
import { ProductRoutes } from "./app/modules/products/product.routes";
import { OrderRoutes } from "./app/modules/orders/order.routes";
const app = express();

// parser option
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
    res.send("E-commerce server is running!")
});

export default app;