import express from "express";
import productRouter from "./routes/products.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger docs",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, "./docs/*.yaml")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello world!" });
});

app.use("/api/products", productRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Express: http://localhost:${PORT}`);
});
