import express from "express";
import {
  getAllCategory,
  postCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategory);
router.post("/", postCategory);
router.get("/:id", getCategoryById);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
