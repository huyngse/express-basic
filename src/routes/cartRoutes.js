import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import {
  addItemToCartValidator,
  itemQuantityValidator,
} from "../validators/cartValidators.js";
import { productIdValidator } from "../validators/productsValidators.js";

const router = Router();

router.get("/cart", cartController.getItems);

router.post(
  "/cart",
  addItemToCartValidator,
  handleValidationErrors,
  cartController.addItem
);

router.put(
  "/cart/:id",
  productIdValidator,
  itemQuantityValidator,
  handleValidationErrors,
  cartController.updateItemQuantity
);

router.delete(
  "/cart/:id",
  productIdValidator,
  handleValidationErrors,
  cartController.removeItem
);

router.delete("/cart", cartController.clearCart);

export default router;
