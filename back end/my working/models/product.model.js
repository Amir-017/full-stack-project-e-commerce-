import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
      default: "Unnamed Product",
    },

    description: {
      type: String,
      required: true,
      minlength: 5,
      default: "No description available",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    brand: {
      type: String,
      trim: true,
      default: "Unknown Brand",
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const productModel = mongoose.model("Product", productSchema);
