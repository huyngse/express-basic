import { Router } from "express";
import { checkProductExists } from "../middlewares/checkProductExists.js";
import {
  validateCreateProduct,
  validateGetProducts,
  validateId,
  validatePatchProduct,
  validateUpdateProduct,
} from "../validators/productsValidators.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

const router = Router();

router.get("/", validateGetProducts, handleValidationErrors, (req, res) => {
  const { filter, value, page = 1, limit = 10 } = req.query;
  const products = getProducts({ filter, value, page, limit });

  res.json(products);
});

router.get(
  "/:id",
  validateId,
  checkProductExists,
  handleValidationErrors,
  (req, res) => {
    res.json(req.product);
  }
);

router.post("/", validateCreateProduct, handleValidationErrors, (req, res) => {
  const newProduct = createProduct(req.body);

  res.status(201).json({
    message: "Product created successfully!",
    product: newProduct,
  });
});

router.put(
  "/:id",
  validateUpdateProduct,
  checkProductExists,
  handleValidationErrors,
  (req, res) => {
    const updatedProduct = updateProduct(req.params.id, req.body);

    res.json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  }
);

router.patch(
  "/:id",
  validatePatchProduct,
  checkProductExists,
  handleValidationErrors,
  (req, res) => {
    const updatedProduct = updateProduct(req.params.id, req.body);

    res.json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  }
);

router.delete(
  "/:id",
  validateId,
  checkProductExists,
  handleValidationErrors,
  (req, res) => {
    const deletedProduct = deleteProduct(req.params.id);
    res.json({
      message: "Product deleted successfully!",
      deleted: deletedProduct,
    });
  }
);

export default router;
