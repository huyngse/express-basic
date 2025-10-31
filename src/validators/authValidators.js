import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("email is not a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
];
