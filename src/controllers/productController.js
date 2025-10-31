import productService from "../services/productService.js";

const productController = {
  getProducts: async (req, res) => {
    const products = await productService.getProducts(req.query);
    res.json(products);
  },
  getProductById: async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.json(product);
  },

  createProduct: async (req, res) => {
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  },

  updateProduct: async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  },

  deleteProduct: async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.json({
      message: "Product deleted successfully!",
      deleted: deletedProduct,
    });
  },
};

export default productController;
