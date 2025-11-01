import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Mongo connection error: ", error);
    process.exit(1);
  }
};
