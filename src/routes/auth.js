import { Router } from "express";
import { validateLogin } from "../validators/auth.js";
import { validationResult } from "express-validator";

const router = Router();

router.post("/login", validateLogin, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  res.cookie("email", email, { maxAge: 3_600_000, signed: true });
  res.json({ message: "Login successful" });
});

export default router;
