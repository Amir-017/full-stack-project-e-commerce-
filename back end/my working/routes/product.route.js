import express from "express";
import {
  allProduct,
  ProductById,
  postProduct,
  updateProduct,
  delProduct,
  allProductByCategory,
  allProductForSideBar
} from "../controllers/prodcut.controller.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../utils/validationProduct.js";
import { mainValidation } from "../utils/mainValidation.js";
import { auth, authorize } from "../middleWare/auth.js";
// auth,
const router = express.Router();

router.get("/", allProduct);
router.get('/allCategoriesName',allProductForSideBar)
router.post("/",auth,authorize('admin'), createProductValidation, mainValidation, postProduct);
router.get("/category/:categoryName", allProductByCategory);
router.get("/:id", ProductById);
router.patch("/:id",auth,authorize('admin'), updateProductValidation, mainValidation, updateProduct);
router.delete("/:id",auth,authorize('admin'), delProduct);

export default router;
