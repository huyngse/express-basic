import { Router } from "express";
import passport from "passport";

const router = Router();

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
