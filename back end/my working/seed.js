import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import { productModel } from "./models/product.model.js";

dotenv.config();

const seedProducts = async () => {
  try {
    // اتصال بالداتابيز
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ Connected to DB");

    // امسح القديم
    await productModel.deleteMany({});
    console.log("✓ Old products deleted");

    // اقرأ ملف JSON
    const data = fs.readFileSync("./bigDataProducts.json", "utf-8");
    const jsonData = JSON.parse(data);

    const products = jsonData.products;

    const cleanProducts = products.map((p) => ({
      // id:p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      brand: p.brand,
      category: p.category,
      images: p.images,
      inStock: p.stock > 0,
    }));

    await productModel.insertMany(cleanProducts);

    console.log("🔥 Done seeding products");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedProducts();
