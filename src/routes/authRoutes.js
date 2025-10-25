import { Router } from "express";
import { validateLogin } from "../validators/authValidators.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  authController.login
);

router.get("/me", authController.me);

export default router;
