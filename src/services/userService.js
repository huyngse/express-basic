import userRepository from "../repositories/userRepository.js";

export const getUsers = async ({ q = "", page = 1, limit = 10 }) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const [users, totalItems] = await userRepository.getPaginated(q, page, limit);
  return {
    page: pageNum,
    limit: limitNum,
    totalItems,
    totalPages: Math.ceil(totalItems / limitNum),
    data: users,
  };
};

export const getUserById = async (id) => {
  return await userRepository.getById(id);
};

export const createUser = async (data) => {
  return await userRepository.create(data);
};

export const updateUser = async (id, updates) => {
  return await userRepository.update(id, updates);
};

export const deleteUser = async (id) => {
  return await userRepository.delete(id);
};

export const authenticateUser = async ({ email, password }) => {
  return await userRepository.authenticateUser(email, password);
};
