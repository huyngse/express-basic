import { Router } from "express";
import { validateLogin } from "../validators/auth.js";
import { validationResult } from "express-validator";
import { USERS } from "../data/users.js";

const router = Router();

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

router.post("/login", validateLogin, (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { email, password } = req.body;
  const user = USERS.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const { password: _, ...userWithoutPassword } = user;

  req.session.user = userWithoutPassword;
  res.json({ message: "Login successful" });
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({ user: req.session.user });
});

export default router;
