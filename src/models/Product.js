import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    category: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
