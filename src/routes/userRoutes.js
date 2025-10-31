import { Router } from "express";
import userController from "../controllers/userController.js";
import {
  createUserValidator,
  userIdValidator,
} from "../validators/userValidator.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

const router = Router();

router.get("/users", userController.getUsers);

router.get(
  "/users/:id",
  userIdValidator,
  handleValidationErrors,
  userController.getUserById
);

router.post(
  "/users",
  createUserValidator,
  handleValidationErrors,
  userController.createUsers
);

export default router;
