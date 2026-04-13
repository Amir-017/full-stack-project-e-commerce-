import { body } from "express-validator";
import { userModel } from "../models/user.model.js";
import { httpError } from "./httpError.js";

//////////////////////////////////////////////

//validation on post user to ensure everthing is ok before create

//////////////////////////////////////////////
export const validationPostUsers = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3, max: 20 })
    .withMessage("name btw 3 and 20")
    .isString()
    .withMessage("name must be string"),
    //
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailRegex.test(value)) {
       throw new Error("Email is wrong");
     }
      const user = await userModel.findOne({ email: value });
      if (user) throw new Error("email already exist");
      return true;
    }),
    //
  body("password")
    .notEmpty()
    .withMessage("Password is  required")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("pass btw 6 and 20")

    .isLength({ min: 6, max: 20 })
    .withMessage("Password between  6 and 20"),
    //
  body("confirmedPassword")
    .notEmpty()
    .withMessage("confirmed password is required")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("pass btw 6 and 20")
    .custom(async (value, { req, next }) => {
      if (value != req.body.password) {
        throw new Error("Pssword doesn't match try again");
      }
      return true;
    }),
];

//////////////////////////////////////////////

//validation on update user to ensure everthing is ok before patch

//////////////////////////////////////////////

export const validatePatchUser = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name between 3 & 20"),
    //
    body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailRegex.test(value)) {
       throw new Error("Email format is wrong");
     }
    
    }),
    //
  body("password")
    .optional()
    .notEmpty()
    .withMessage("pass must entired")
    .isLength({ min: 6, max: 20 })
    .withMessage("pass btw 6 & 20"),
    //
    body("confirmedPassword")
    .optional()
    .notEmpty()
    .withMessage("confirmed password is required")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password between 6 and 20")
    .custom(async (value, { req, next }) => {
      if (value != req.body.password) {
        throw new Error("Password doesn't match try again");
      }
      return true;
    }),
];
