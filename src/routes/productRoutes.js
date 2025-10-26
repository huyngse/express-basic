import { Router } from "express";
import { checkProductExists } from "../middlewares/checkProductExists.js";
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
  checkProductExists,
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
  checkProductExists,
  handleValidationErrors,
  productController.updateProduct
);

router.patch(
  "/products/:id",
  validatePatchProduct,
  checkProductExists,
  handleValidationErrors,
  productController.updateProduct
);

router.delete(
  "/products/:id",
  validateProductId,
  checkProductExists,
  handleValidationErrors,
  productController.deleteProduct
);

export default router;
