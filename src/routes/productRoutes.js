import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import {
  validateCreateProduct,
  validateGetProducts,
  validateProductId,
  validatePatchProduct,
  validateUpdateProduct,
} from "../validators/productsValidators.js";
import * as productController from "../controllers/productController.js";

const router = Router();

router.get(
  "/products",
  validateGetProducts,
  handleValidationErrors,
  productController.getProducts
);

router.get(
  "/products/:id",
  validateProductId,
  handleValidationErrors,
  productController.getProductById
);

router.post(
  "/products",
  validateCreateProduct,
  handleValidationErrors,
  productController.createProduct
);

router.put(
  "/products/:id",
  validateUpdateProduct,
  handleValidationErrors,
  productController.updateProduct
);

router.patch(
  "/products/:id",
  validatePatchProduct,
  handleValidationErrors,
  productController.updateProduct
);

router.delete(
  "/products/:id",
  validateProductId,
  handleValidationErrors,
  productController.deleteProduct
);

export default router;
