import express from "express";
import {
  allUser,
  registerUser,
  UserById,
  updateUser,
  delUser,
  loginUser,
  changePassword,
  changeRole,
  infoUser

} from "../controllers/user.controller.js";
import {
  validatePatchUser,
  validationPostUsers,
} from "../utils/validationUsers.js";
import { mainValidation } from "../utils/mainValidation.js";
import { auth, authorize } from "../middleWare/auth.js";
// import { upload } from '../utils/multer.js'
const router = express.Router();

router.get("/",auth,authorize('admin'), allUser);
router.get("/me",auth, infoUser);
router.post("/", validationPostUsers, mainValidation, registerUser);
router.post("/login", loginUser);
// router.post("/login/refresh", refreshNewToken);
router.get("/profile",auth,authorize('admin','member'), UserById);
router.patch("/editeProfile",auth,authorize('member','admin'), validatePatchUser, mainValidation, updateUser);
router.patch("/changePasaword",auth,authorize('member'), changePassword);
router.delete("/:id",auth,authorize('admin'), delUser);   
router.patch("/:id/role",auth,authorize('admin'), changeRole);   

export default router;
