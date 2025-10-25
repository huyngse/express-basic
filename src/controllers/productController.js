import * as productService from "../services/productService.js";

export const getProducts = (req, res) => {
  const products = productService.getProducts(req.query);
  res.json(products);
};

export const getProductById = (req, res) => {
  res.json(req.product);
};

export const createProduct = (req, res) => {
  const newProduct = productService.createProduct(req.body);

  res.status(201).json({
    message: "Product created successfully!",
    product: newProduct,
  });
};

export const updateProduct = (req, res) => {
  const updatedProduct = productService.updateProduct(req.params.id, req.body);

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
};

export const deleteProduct = (req, res) => {
  const deletedProduct = productService.deleteProduct(req.params.id);
  res.json({
    message: "Product deleted successfully!",
    deleted: deletedProduct,
  });
};
