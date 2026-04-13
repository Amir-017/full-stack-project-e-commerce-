import mongoose from "mongoose";

const cateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const categoryModel = mongoose.model("category", cateSchema);

export default categoryModel;
