import * as userService from "../services/userService.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);
  if (!user) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const { password: _, ...userWithoutPassword } = user;

  req.session.user = userWithoutPassword;
  res.json({ message: "Login successful" });
};

export const me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({ user: req.session.user });
};
