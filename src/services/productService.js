import { PRODUCTS } from "../data/products.js";

export const getProducts = ({ q = "", page = 1, limit = 10 }) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  let filteredProducts = PRODUCTS;

  if (q.trim()) {
    const query = q.toLowerCase();
    filteredProducts = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    page: pageNum,
    limit: limitNum,
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
    data: paginatedProducts,
  };
};

export const getProductById = (id) => {
  return PRODUCTS.find((product) => product.id === parseInt(id));
};

export const getProductsByIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  const idNumbers = ids.map((id) => parseInt(id));
  return PRODUCTS.filter((product) => idNumbers.includes(product.id));
};

export const createProduct = ({
  name,
  description,
  price,
  inStock,
  category,
  image,
}) => {
  const newProduct = {
    id: PRODUCTS.length + 1,
    name,
    description,
    price,
    inStock,
    category,
    image,
  };
  PRODUCTS.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const index = PRODUCTS.findIndex((p) => p.id === parseInt(id));
  if (index === -1) return null;
  const existingProduct = PRODUCTS[index];
  const updatedProduct = { ...existingProduct, ...updates };
  PRODUCTS[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = (id) => {
  const index = PRODUCTS.findIndex((p) => p.id === parseInt(id));
  if (index === -1) return null;
  const deletedProduct = PRODUCTS.splice(index, 1)[0];
  return deletedProduct;
};
