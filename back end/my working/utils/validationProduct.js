import { body } from "express-validator";

//////////////////////////////////////////////

//validation on post product to ensure everthing is ok before create

//////////////////////////////////////////////
export const createProductValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Title must be between 2 and 200 characters")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discountPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  body("brand").optional().trim(),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .trim()
    .toLowerCase(),

  body("images").optional().isArray().withMessage("Images must be an array"),

  body("images.*")
    .optional()
    .isURL()
    .withMessage("Each image must be a valid URL"),

  body("inStock")
    .optional()
    .isBoolean()
    .withMessage("inStock must be true or false"),
];

//////////////////////////////////////////////

//validation on update product to ensure everthing is ok before patch

//////////////////////////////////////////////
export const updateProductValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 2, max: 200 })
    .withMessage("Title must be between 2 and 200 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discountPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  body("brand")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Brand cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Brand must be at least 3 characters"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Category must be at least 3 characters")
    .toLowerCase(),

  body("images").optional().isArray().withMessage("Images must be an array"),

  body("images.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Image URL cannot be empty")
    .isURL()
    .withMessage("Each image must be a valid URL"),

  body("inStock")
    .optional()
    .isBoolean()
    .withMessage("inStock must be true or false"),
];
