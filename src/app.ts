import express from "express";
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Helioo World!")
});

export default app;