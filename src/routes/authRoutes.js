import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: info.message });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Login successfully!" });
    });
  })(req, res, next);
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
