import productService from "../services/productService.js";

export const getProducts = async (req, res) => {
  const products = await productService.getProducts(req.query);
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(product);
};

export const createProduct = async (req, res) => {
  const newProduct = await productService.createProduct(req.body);

  res.status(201).json({
    message: "Product created successfully!",
    product: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const updatedProduct = await productService.updateProduct(
    req.params.id,
    req.body
  );

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  const deletedProduct = await productService.deleteProduct(req.params.id);
  res.json({
    message: "Product deleted successfully!",
    deleted: deletedProduct,
  });
};
