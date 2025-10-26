import { body, param, query } from "express-validator";

export const validateGetProducts = [
  query("filter").optional().isString().withMessage("filter must be a string"),
  query("value").optional().isString().withMessage("value must be a string"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be an integer >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be an integer >= 1"),
];

export const validateProductId = [
  param("id")
    .exists()
    .withMessage("id is required")
    .isInt({ gt: 0 })
    .withMessage("id must be a positive integer"),
];

export const validateCreateProduct = [
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("name must be 1-100 characters long"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .isLength({ max: 1200 })
    .withMessage("description can be up to 1200 characters long"),
  body("price")
    .exists()
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),
  body("inStock")
    .exists()
    .withMessage("inStock is required")
    .isBoolean()
    .withMessage("inStock must be a boolean"),
  body("category")
    .exists()
    .withMessage("category is required")
    .isString()
    .withMessage("category must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("category must be 1-50 characters long"),
  body("image")
    .exists()
    .withMessage("image is required")
    .isURL()
    .withMessage("image must be a valid URL"),
];

export const validateUpdateProduct = [
  ...validateProductId,
  ...validateCreateProduct,
];

export const validatePatchProduct = [
  ...validateProductId,
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("name must be 1-100 characters long"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .isLength({ max: 1200 })
    .withMessage("description can be up to 1200 characters long"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),
  body("inStock")
    .optional()
    .isBoolean()
    .withMessage("inStock must be a boolean"),
  body("category")
    .optional()
    .isString()
    .withMessage("category must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("category must be 1-50 characters long"),
  body("image").optional().isURL().withMessage("image must be a valid URL"),
];
