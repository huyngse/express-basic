import { PRODUCTS } from "../data/products.js";

export const getProducts = ({ filter, value, page = 1, limit = 10 }) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  let filteredProducts = PRODUCTS;

  if (filter && value) {
    filteredProducts = PRODUCTS.filter((product) => {
      const fieldValue = product[filter];
      return typeof fieldValue === "string"
        ? fieldValue.toLowerCase().includes(value.toLowerCase())
        : fieldValue == value;
    });
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
