import * as productService from "../services/productService.js";

export const getItems = (req, res) => {
  const cartItems = req.session.cart;
  if (!cartItems || cartItems.length === 0) {
    return res.json([]);
  }

  const itemIds = cartItems.map((ci) => ci.id);

  const cartLookUp = Object.fromEntries(
    cartItems.map((ci) => [ci.id, ci.quantity])
  );
  const products = productService
    .getProductsByIds(itemIds)
    .map((p) => ({ ...p, quantity: cartLookUp[p.id] || 0 }));

  return res.json(products);
};

export const addItem = (req, res) => {
  const { id, quantity } = req.body;
  const product = productService.getProductById(id);
  if (!product) {
    return res.status(400).json({ message: "Product not found!" });
  }
  const cartItems = req.session.cart || [];
  const existingItem = cartItems.find((ci) => ci.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }
  req.session.cart = cartItems;
  res.json({ message: "Item added successfully!" });
};

export const updateItemQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const cartItems = req.session.cart;
  if (!cartItems) {
    return res.status(400).json({ message: "Item not found!" });
  }
  const cartItem = cartItems.find((ci) => ci.id === parseInt(id));
  if (!cartItem) {
    return res.status(400).json({ message: "Item not found!" });
  }
  cartItem.quantity = quantity;
  res.json({ message: "Item updated successfully!" });
};

export const removeItem = (req, res) => {
  const { id } = req.params;
  const cartItems = req.session.cart;
  if (
    !cartItems ||
    cartItems.findIndex((ci) => ci.id === parseInt(id)) === -1
  ) {
    return res.status(400).json({ message: "Item not found!" });
  }
  req.session.cart = cartItems.filter((ci) => ci.id !== parseInt(id));
  res.json({ message: "Item removed successfully!" });
};

export const clearCart = (req, res) => {
  req.session.cart = [];
  res.json({ message: "Cart cleared successfully!" });
};
