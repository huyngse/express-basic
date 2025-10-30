import userRepository from "../repositories/userRepository.js";

const userService = {
  getUsers: async ({ q = "", page = 1, limit = 10 }) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const { users, totalItems } = await userRepository.getPaginated(
      q,
      page,
      limit
    );
    return {
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      data: users,
    };
  },

  getUserById: async (id) => {
    return await userRepository.getById(id);
  },

  createUser: async (data) => {
    return await userRepository.create(data);
  },

  updateUser: async (id, updates) => {
    return await userRepository.update(id, updates);
  },

  deleteUser: async (id) => {
    return await userRepository.delete(id);
  },

  authenticateUser: async ({ email, password }) => {
    return await userRepository.authenticateUser(email, password);
  },
};

export default userService;
