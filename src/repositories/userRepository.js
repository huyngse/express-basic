import User from "../models/User.js";
import bcrypt from "bcryptjs";

const buildFilter = (q) => {
  const query = q.trim().toLowerCase();
  return query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          {
            email: { $regex: query, $options: "i" },
          },
        ],
      }
    : {};
};

const userRepository = {
  getPaginated: async ({ q = "", page = 1, limit = 10 }) => {
    const filter = buildFilter(q);
    const skip = (page - 1) * limit;
    const [users, totalItems] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).select("-password"),
      User.countDocuments(filter),
    ]);
    return { users, totalItems };
  },

  getById: async (id) => {
    return User.findById(id).select("-password");
  },

  getByGoogleId: async (id) => {
    return User.findOne({ googleId: id });
  },

  create: async ({ name, email, age, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: email.toLowerCase(),
      age,
      password: hashedPassword,
    });
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  },

  createGoogleUser: async ({ name, email, googleId }) => {
    const user = new User({
      name,
      email,
      googleId,
    });
    await user.save();
    const userObj = user.toObject();
    return userObj;
  },

  update: async (id, updates) => {
    delete updates._id;
    delete updates.email;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    return await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
  },

  delete: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  authenticateUser: async ({ email, password }) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  },
};

export default userRepository;
