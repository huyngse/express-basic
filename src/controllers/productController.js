import * as productService from "../services/productService.js";

export const getProducts = (req, res) => {
  const products = productService.getProducts(req.query);
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(product);
};

export const createProduct = (req, res) => {
  const newProduct = productService.createProduct(req.body);

  res.status(201).json({
    message: "Product created successfully!",
    product: newProduct,
  });
};

export const updateProduct = (req, res) => {
  const product = productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const updatedProduct = productService.updateProduct(req.params.id, req.body);

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
};

export const deleteProduct = (req, res) => {
  const product = productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  const deletedProduct = productService.deleteProduct(req.params.id);
  res.json({
    message: "Product deleted successfully!",
    deleted: deletedProduct,
  });
};
