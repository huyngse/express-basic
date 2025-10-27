import express from "express";
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./middlewares/logger.js";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/localStrategy.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Connection error: ", error));

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
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 3_600_000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);

app.get("/", (req, res) => {
  req.sessionStore.get(req.session.id, (error, sessionData) => {
    if (error) {
      console.log("Error: ", error);
      throw error;
    }
    console.log(sessionData);
  });
  return res.status(200).json({ msg: "Hello world!" });
});

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", cartRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(chalk.magenta(`Express: http://localhost:${PORT}`));
});
