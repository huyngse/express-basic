import express from "express";
import productRouter from "./src/routes/products.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello!" });
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Express: http://localhost:${PORT}`);
});
