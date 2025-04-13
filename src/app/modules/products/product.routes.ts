import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    res.send("Product route");
});

export const ProductRoutes = router;