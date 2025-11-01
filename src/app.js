import dotenv from "dotenv";
dotenv.config();

import express from "express";
import swaggerUi from "swagger-ui-express";
import logger from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./strategies/localStrategy.js";
import "./strategies/googleStrategy.js";
import { swaggerSpec } from "./config/swagger.js";
import {
  authRouter,
  cartRouter,
  productRouter,
  userRouter,
} from "./routes/index.js";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

const app = express();

await connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 3_600_000,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
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
app.use("/api", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
