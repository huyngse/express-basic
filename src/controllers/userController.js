import userService from "../services/userService.js";

const userController = {
  getUsers: async (req, res) => {
    const users = await userService.getUsers(req.query);
    res.json(users);
  },

  createUsers: async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.json({ messaeg: "User created successfully!", user: newUser });
  },

  getUserById: async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  },
};

export default userController;
