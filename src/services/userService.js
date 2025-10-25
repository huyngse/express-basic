import { USERS } from "../data/users.js";
import bcrypt from "bcryptjs";

export const getUsers = ({ q = "", page = 1, limit = 10 }) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  let filteredUsers = USERS;

  if (q.trim()) {
    const query = q.toLowerCase();
    filteredUsers = USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    const safeUsers = paginatedUsers.map(({ password, ...rest }) => rest);

    return {
      page: pageNum,
      limit: limitNum,
      totalItems: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limitNum),
      data: safeUsers,
    };
  }
};

export const getUserById = (id) => {
  const user = USERS.find((user) => user.id === id);
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

export const createUser = async ({ name, email, age, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: USERS.length + 1,
    name,
    email,
    age,
    password: hashedPassword,
  };
  USERS.push(newUser);

  const { password: _, ...safeUser } = newUser;
  return safeUser;
};

export const updateUser = (id, updates) => {
  const index = USERS.findIndex((user) => user.id === parseInt(id));
  if (index === -1) return null;
  const existingUser = USERS[index];
  const updatedUser = { ...existingUser, ...updates };
  USERS[index] = updatedUser;
  const { password: _, ...safeUser } = updatedUser;
  return safeUser;
};

export const deleteUser = (id) => {
  const index = USERS.findIndex((user) => user.id === parseInt(id));
  if (index === -1) return null;
  const deletedUser = USERS.splice(index, 1)[0];
  const { password: _, ...safeUser } = deletedUser;
  return safeUser;
};

export const authenticateUser = async (email, password) => {
  const user = USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return null;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;
  const { password: _, ...safeUser } = user;
  return safeUser;
};
