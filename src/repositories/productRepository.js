import Product from "../models/Product.js";

const buildFilter = (q) => {
  if (q.trim()) {
    const query = q.toLowerCase();
    return {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
  }
};
const productRepositry = {
  create: async (productData) => {
    const product = new Product(productData);
    return await product.save();
  },

  getPaginated: async (q = "", page = 1, limit = 10) => {
    const filter = buildFilter(q);
    const skip = (page - 1) * limit;
    const [products, totalItems] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);
    return { products, totalItems };
  },

  getById: async (id) => {
    return await Product.findById(id);
  },

  getByIds: async (ids = []) => {
    return await Product.find({ _id: { $in: ids } });
  },

  update: async (id, udpateData) => {
    return await Product.findByIdAndUpdate(id, udpateData, {
      new: true,
    });
  },

  delete: async (id) => {
    return await Product.findByIdAndDelete(id);
  },
};

export default productRepositry;
