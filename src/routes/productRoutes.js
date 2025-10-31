import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import productController from "../controllers/productController.js";
import {
  createProductValidator,
  getProductsValidator,
  patchProductValidator,
  productIdValidator,
  updateProductValidator,
} from "../validators/productsValidators.js";

const router = Router();

router.get(
  "/products",
  getProductsValidator,
  handleValidationErrors,
  productController.getProducts
);

router.get(
  "/products/:id",
  productIdValidator,
  handleValidationErrors,
  productController.getProductById
);

router.post(
  "/products",
  createProductValidator,
  handleValidationErrors,
  productController.createProduct
);

router.put(
  "/products/:id",
  updateProductValidator,
  handleValidationErrors,
  productController.updateProduct
);

router.patch(
  "/products/:id",
  patchProductValidator,
  handleValidationErrors,
  productController.updateProduct
);

router.delete(
  "/products/:id",
  productIdValidator,
  handleValidationErrors,
  productController.deleteProduct
);

export default router;
