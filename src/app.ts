import express from "express";
import cors from 'cors';
import { ProductRoutes } from "./app/modules/products/product.routes";
const app = express();

// parser option
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', ProductRoutes);

app.get('/', (req, res) => {
    res.send("E-commerce server is running!")
});

export default app;