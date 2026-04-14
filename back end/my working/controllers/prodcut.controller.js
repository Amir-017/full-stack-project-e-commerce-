import { log } from "console";
import { productModel } from "../models/product.model.js";
import { userModel } from "../models/user.model.js";
import { errorHandling } from "../utils/errorHandling.js";
import { httpError } from "../utils/httpError.js";
import mongoose from "mongoose";

//////////////////////////////////////////////

//all product

//////////////////////////////////////////////

export const allProduct = errorHandling(async (req, res, next) => {
  const { search, dashboardAdmin, page = 1, limit = 10 } = req.query;
  if (search) {
    const skip = (page - 1) * limit;
    // const foundOneSearched = await productModel.find() sooooooooooon.
    const products = await productModel
      .find({
        title: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(+limit);

    const total = await productModel.countDocuments({
      title: { $regex: search, $options: "i" },
    });
    console.log(typeof page);

    res.json({
      page,
      limit,
      total,
      products,
      totalPages: Math.ceil(total / limit),
    });
  } else if (dashboardAdmin) {
    const skip = (page - 1) * limit;
    // const foundOneSearched = await productModel.find() sooooooooooon.
    const products = await productModel
      .find({
        // title: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(+limit);

    const total = await productModel.countDocuments({
      // title: { $regex: search, $options: "i" },
    });
    console.log(typeof page);

    res.json({
      page,
      limit,
      total,
      products,
      totalPages: Math.ceil(total / limit),
    });
  } else {
    const products = await productModel.find({}).limit(30);
    log(products.length);
    if (!products.length) return next(new httpError(404, "no products found"));
    res.json({
      status: 200,
      message: "product fetched successfully",
      products,
    });
  }
});

//////////////////////////////////////////////

// all product with category

//////////////////////////////////////////////
export const allProductByCategory = errorHandling(async (req, res, next) => {
  const { categoryName, page = 1, limit = 20 } = req.params;

  const skip = (page - 1) * limit;

  const productsCategory = await productModel
    .find({ category: categoryName })
    .skip(skip)
    .limit(Number(limit));

  const total = await productModel.countDocuments({ category: categoryName });
  // console.log(productsCategory.length);

  // if (!productsCategory.length)
  //   return next(new httpError(400, "Sorry This category not found😢"));
  res.json({
    status: 200,
    message: "products found successfully",
    products: productsCategory,
    total,
    page: Number(page),
    totalPage: Math.ceil(total / limit),
  });
});
//////////////////////////////////////////////

// all product with category Name for side bar (عملنا كدا لاننا محتاجين ف السايد بار كل اسماء الكاتيجورز واحنا مش هنجيب ال150 منتج عشان نعرض اسماءهم دا هيبق تو ماتش لود وكمان بروفورمانس ف الارض)

//////////////////////////////////////////////

export const allProductForSideBar = errorHandling(async (req, res, next) => {
  res.json({
    categoriesName: [
      "beauty",
      "fragrances",
      "furniture",
      "groceries",
      "home-decoration",
      "kitchen-accessories",
      "laptops",
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "mobile-accessories",
      "motorcycle",
      "skin-care",
      "smartphones",
      "sports-accessories",
      "sunglasses",
      "tablets",
      "tops",
      "vehicle",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  });
});

//////////////////////////////////////////////

//product by id

//////////////////////////////////////////////

export const ProductById = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new httpError(400, "Invalid product Id"));
  const foundOne = await productModel.findById(id);
  if (!foundOne) return next(new httpError(404, "Product not found"));
  res.json({
    status: 200,
    message: "product found successfully",
    data: foundOne,
  });
});

//////////////////////////////////////////////

//post product

//////////////////////////////////////////////
export const postProduct = errorHandling(async (req, res, next) => {
  const main = req.body;
  console.log(main);

  const postedOne = await productModel.create(main);
  if (!postedOne)
    return next(new httpError(400, "cant create product you have an error"));

  res.json({
    status: 201,
    message: "product posted successfully",
    data: postedOne,
  });
});

//////////////////////////////////////////////

//update product

//////////////////////////////////////////////
export const updateProduct = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const main = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new httpError(400, "Invalid product Id"));

  const updatedOne = await productModel.findByIdAndUpdate(id, main, {
    new: true,
  });
  if (!updatedOne)
    return next(new httpError(404, "cant update product you have an error"));

  res.json({
    status: 200,
    message: "product updated successfully",
    data: updatedOne,
  });
});

//////////////////////////////////////////////

//delete product

//////////////////////////////////////////////
export const delProduct = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new httpError(400, "Invalid product Id"));

  const delOne = await productModel.findByIdAndDelete(id);
  if (!delOne)
    return next(new httpError(404, "cant delete product you have an error"));

  res.json({
    status: 200,
    message: "product delete successfully",
    data: delOne,
  });
});
