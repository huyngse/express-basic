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

router.get("/", (req, res) => {
  return res.json(PRODUCTS);
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
