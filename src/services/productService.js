import productRepositry from "../repositories/productRepository.js";

export const getProducts = async ({ q = "", page = 1, limit = 10 }) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const { products, totalItems } = await productRepositry.getPaginated(
    q,
    pageNum,
    limitNum
  );

  return {
    page: pageNum,
    limit: limitNum,
    totalItems,
    totalPages: Math.ceil(totalItems / limitNum),
    data: products,
  };
};

export const getProductById = async (id) => {
  return await productRepositry.getById(id);
};

export const getProductsByIds = async (ids = []) => {
  return await productRepositry.getByIds(ids);
};

export const createProduct = async (data) => {
  return await productRepositry.create(data);
};

export const updateProduct = async (id, data) => {
  return await productRepositry.update(id, data);
};

export const deleteProduct = async (id) => {
  return await productRepositry.delete(id);
};
