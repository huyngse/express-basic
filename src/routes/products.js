import { Router } from "express";
import { PRODUCTS } from "../data/products.js";

const router = Router();

router.get("/", (req, res) => {
  const { filter, value, page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  let filteredProducts = PRODUCTS;

  if (filter && value) {
    filteredProducts = PRODUCTS.filter((product) => {
      const fieldValue = product[filter];
      return typeof fieldValue === "string"
        ? fieldValue.toLowerCase().includes(value.toLowerCase())
        : fieldValue == value;
    });
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    page: pageNum,
    limit: limitNum,
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
    data: paginatedProducts,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", (req, res) => {
  const { name, description, price, inStock, category, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  const newProduct = {
    id: PRODUCTS.length + 1,
    name,
    description,
    price,
    inStock,
    category,
    image,
  };
  PRODUCTS.push(newProduct);

  res.status(201).json({
    message: "Product created successfully!",
    product: newProduct,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, inStock, category, image } = req.body;

  const productIndex = PRODUCTS.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const existingProduct = PRODUCTS[productIndex];

  const updatedProduct = {
    ...existingProduct,
    name: name ?? existingProduct.name,
    description: description ?? existingProduct.description,
    price: price ?? existingProduct.price,
    inStock: inStock ?? existingProduct.inStock,
    category: category ?? existingProduct.category,
    image: image ?? existingProduct.image,
  };

  PRODUCTS[productIndex] = updatedProduct;

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const productIndex = PRODUCTS.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const existingProduct = PRODUCTS[productIndex];
  const updatedProduct = { ...existingProduct, ...updates };

  PRODUCTS[productIndex] = updatedProduct;

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
});

router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = PRODUCTS.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found!' });
  }

  const deletedProduct = PRODUCTS.splice(index, 1);
  res.json({ message: 'Product deleted successfully!', deleted: deletedProduct[0] });
});

export default router;