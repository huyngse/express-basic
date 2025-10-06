import { Router } from "express";

const router = Router();

const PRODUCTS = [
  {
    id: 1,
    name: "Cozy Camp Mug ☕",
    description: "A sturdy enamel mug perfect for hot cocoa under the stars~",
    price: 14.99,
    inStock: true,
    category: "Camping Gear",
    image: "/images/mug.jpg",
  },
  {
    id: 2,
    name: "Fluffy Sleeping Bag 💤",
    description: "Super warm and snuggly sleeping bag for chilly nights~",
    price: 89.99,
    inStock: true,
    category: "Camping Gear",
    image: "/images/sleeping-bag.jpg",
  },
  {
    id: 3,
    name: "S’mores Kit 🍫",
    description: "All the yummy essentials for campfire s’mores—just add fire!",
    price: 12.5,
    inStock: false,
    category: "Snacks",
    image: "/images/smores.jpg",
  },
  {
    id: 4,
    name: "Mini Lantern 🔦",
    description: "Tiny but mighty LED lantern that lights up your campsite~",
    price: 24.0,
    inStock: true,
    category: "Lighting",
    image: "/images/lantern.jpg",
  },
  {
    id: 5,
    name: "Thermal Picnic Blanket 🧺",
    description:
      "Soft and waterproof blanket—perfect for cozy picnics or stargazing!",
    price: 39.99,
    inStock: true,
    category: "Outdoor Living",
    image: "/images/blanket.jpg",
  },
];

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing camp store products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a paginated list of all available products. You can also filter by specific fields like category or inStock~!
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The field name to filter by (e.g., `category`, `inStock`, `name`).
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: The value to filter the selected field by.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of products per page.
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Fetch a single product using its unique ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Cozy Camp Mug
 *         description:
 *           type: string
 *           example: A sturdy enamel mug perfect for hot cocoa under the stars~
 *         price:
 *           type: number
 *           example: 14.99
 *         inStock:
 *           type: boolean
 *           example: true
 *         category:
 *           type: string
 *           example: Camping Gear
 *         image:
 *           type: string
 *           example: /images/mug.jpg
 */

router.get("/", (req, res) => {
  const { filter, value, page = 1, limit = 10 } = req.query;

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

  res.json({
    page: pageNum,
    limit: limitNum,
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
    data: paginatedProducts,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

export default router;
