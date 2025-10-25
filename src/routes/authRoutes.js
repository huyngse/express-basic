import { Router } from "express";
import { validateLogin } from "../validators/authValidators.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
import { authenticateUser } from "../services/userService.js";

const router = Router();

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const { password: _, ...userWithoutPassword } = user;

    req.session.user = userWithoutPassword;
    res.json({ message: "Login successful" });
  }
);

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({ user: req.session.user });
});

export default router;
