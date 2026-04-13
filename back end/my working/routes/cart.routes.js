import express from "express";
import {
  getCart,
  getAllCartForAdmin,
  postCart,
  updateCart,
  deleteSpecificProduct,
  clearCart,
} from "../controllers/cart.controller.js";
import { auth, authorize } from "../middleWare/auth.js";
const router = express.Router();
     
router.use(auth);
router.get("/",authorize('member'), getCart);
router.delete("/",authorize('member'), clearCart);
router.post("/addTocart",authorize('member'), postCart);
router.get("/allCart",authorize('admin'), getAllCartForAdmin);
router.patch("/:productId",authorize('member'), updateCart);
router.delete("/:productId",authorize('member'), deleteSpecificProduct);
   
export default router;
     