import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },   
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

export const cartModel = mongoose.model("Cart", cartSchema);
   