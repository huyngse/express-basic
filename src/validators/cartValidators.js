import { body } from "express-validator";

export const validateItemQuantity = [
  body("quantity")
    .exists()
    .withMessage("quantity is required")
    .isInt({ gt: 0, lt: 101 })
    .withMessage("quantity must be between 1 and 100"),
];

export const validateAddItemToCart = [
  body("id")
    .exists()
    .withMessage("id is required")
    .isInt({ gt: 0 })
    .withMessage("id must be a positive integer"),
  validateItemQuantity,
];
