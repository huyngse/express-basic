import { PRODUCTS } from "../data/products.js";

export const checkProductExists = (req, res, next) => {
  const { id } = req.params;

  const numericId = Number(id);
  if (
    Number.isNaN(numericId) ||
    numericId < 0 ||
    !Number.isInteger(numericId)
  ) {
    return res.status(400).json({ message: "Invalid product ID!" });
  }

  const product = PRODUCTS.find((p) => p.id === numericId);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  req.product = product;
  next();
};
