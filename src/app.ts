import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("E-commerce server is running!")
});

export default app;