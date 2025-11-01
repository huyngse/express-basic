import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
