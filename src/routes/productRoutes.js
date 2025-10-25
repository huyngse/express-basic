import { Router } from "express";
import { checkProductExists } from "../middlewares/checkProductExists.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import {
  validateCreateProduct,
  validateGetProducts,
  validateId,
  validatePatchProduct,
  validateUpdateProduct,
} from "../validators/productsValidators.js";
import * as productController from "../controllers/productController.js";

const router = Router();

router.get(
  "/",
  validateGetProducts,
  handleValidationErrors,
  productController.getProducts
);

router.get(
  "/:id",
  validateId,
  checkProductExists,
  handleValidationErrors,
  productController.getProductById
);

router.post(
  "/",
  validateCreateProduct,
  handleValidationErrors,
  productController.createProduct
);

router.put(
  "/:id",
  validateUpdateProduct,
  checkProductExists,
  handleValidationErrors,
  productController.updateProduct
);

router.patch(
  "/:id",
  validatePatchProduct,
  checkProductExists,
  handleValidationErrors,
  productController.updateProduct
);

router.delete(
  "/:id",
  validateId,
  checkProductExists,
  handleValidationErrors,
  productController.deleteProduct
);

export default router;
