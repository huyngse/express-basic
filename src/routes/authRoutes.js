import { Router } from "express";
// import { validateLogin } from "../validators/authValidators.js";
// import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";
// import * as authController from "../controllers/authController.js";
import passport from "passport";

const router = Router();

// router.post(
//   "/auth/login",
//   validateLogin,
//   handleValidationErrors,
//   authController.login
// );

// router.get("/auth/me", authController.me);

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successfully!" });
});

router.get("/auth/me", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.sendStatus(401);
});

router.post("/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((error) => {
    if (error) return res.sendStatus(400);
    res.json({ message: "Log out successfully!" });
  });
});

export default router;
