import { Router } from "express";
import { PRODUCTS } from "../data/products.js";
import { checkProductExists } from "../middlewares/checkProductExists.js";
import { validationResult } from "express-validator";
import {
  validateCreateProduct,
  validateGetProducts,
  validateId,
  validatePatchProduct,
  validateUpdateProduct,
} from "../validators/products.js";

const router = Router();

router.get("/", validateGetProducts, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

router.get("/:id", validateId, checkProductExists, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json(req.product);
});

router.post("/", validateCreateProduct, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, inStock, category, image } = req.body;

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

router.put("/:id", validateUpdateProduct, checkProductExists, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, description, price, inStock, category, image } = req.body;

  const productIndex = PRODUCTS.findIndex((p) => p.id === parseInt(id));
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

router.patch("/:id", validatePatchProduct, checkProductExists, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  const productIndex = PRODUCTS.findIndex((p) => p.id === parseInt(id));
  const existingProduct = PRODUCTS[productIndex];
  const updatedProduct = { ...existingProduct, ...updates };

  PRODUCTS[productIndex] = updatedProduct;

  res.json({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
});

router.delete("/:id", validateId, checkProductExists, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const productId = parseInt(req.params.id);
  const index = PRODUCTS.findIndex((p) => p.id === productId);

  const deletedProduct = PRODUCTS.splice(index, 1);
  res.json({
    message: "Product deleted successfully!",
    deleted: deletedProduct[0],
  });
});

export default router;
