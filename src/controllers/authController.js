import userService from "../services/userService.js";

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const { password: _, ...userWithoutPassword } = user;

    req.session.user = userWithoutPassword;
    res.json({ message: "Login successful" });
  },

  me: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    res.json({ user: req.session.user });
  },
};

export default authController;
