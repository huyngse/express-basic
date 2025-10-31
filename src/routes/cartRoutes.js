import { Router } from "express";
import cartController from "../controllers/cartController.js";
import {
  validateAddItemToCart,
  validateItemQuantity,
} from "../validators/cartValidators.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import { validateProductId } from "../validators/productsValidators.js";

const router = Router();

router.get("/cart", cartController.getItems);

router.post(
  "/cart",
  validateAddItemToCart,
  handleValidationErrors,
  cartController.addItem
);

router.put(
  "/cart/:id",
  validateProductId,
  validateItemQuantity,
  handleValidationErrors,
  cartController.updateItemQuantity
);

router.delete(
  "/cart/:id",
  validateProductId,
  handleValidationErrors,
  cartController.removeItem
);

router.delete("/cart", cartController.clearCart);

export default router;
