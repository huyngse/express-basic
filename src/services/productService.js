import productRepositry from "../repositories/productRepository.js";

const productService = {
  getProducts: async ({ q = "", page = 1, limit = 10 }) => {
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
  },

  getProductById: async (id) => {
    return await productRepositry.getById(id);
  },

  createProduct: async (data) => {
    return await productRepositry.create(data);
  },

  updateProduct: async (id, data) => {
    return await productRepositry.update(id, data);
  },

  deleteProduct: async (id) => {
    return await productRepositry.delete(id);
  },
};

export default productService;
