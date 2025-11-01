import mongoose from "mongoose";
import app from "./app.js";
import chalk from "chalk";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(chalk.magenta(`Server running at http://localhost:${PORT}`));
});
