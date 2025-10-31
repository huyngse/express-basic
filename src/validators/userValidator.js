import { body, param } from "express-validator";
import mongoose from "mongoose";

export const userIdValidator = [
  param("id")
    .exists()
    .withMessage("id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid id format!"),
];

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid")
    .normalizeEmail(),
  body("age")
    .notEmpty()
    .withMessage("age is required")
    .isInt({ min: 0 })
    .withMessage("age must be a positive number"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be a least 6 characters long"),
];
