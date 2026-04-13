import categoryModel from "../models/category.model.js";
import { errorHandling } from "../utils/errorHandling.js";
import { httpError } from "../utils/httpError.js";
// import {getAllCategory,postCategory, getCategoryById,updateCategory,delCate} from '../controllers/category.controller.js'

//////////////////////////////////////////////

//all category

//////////////////////////////////////////////
export const getAllCategory = errorHandling(async (req, res, next) => {
  const allCategores = await categoryModel.find({});
  if (!allCategores.length)
    return next(new httpError(404, "Sorry this category cant exist😢"));
  res.json(allCategores);
});

//////////////////////////////////////////////

//post category

//////////////////////////////////////////////
export const postCategory = errorHandling(async (req, res, next) => {
  const main = req.body;
  const postedOne = await categoryModel.create(main);
  if (!postedOne)
    return next(new httpError(404, "This category name not found"));
  res.json(postedOne);
});

//////////////////////////////////////////////

// category by id

//////////////////////////////////////////////
export const getCategoryById = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const foundOne = await categoryModel.findById(id);
  if (!foundOne) return next(new httpError(404, "Category not found"));
  res.json(foundOne);
});

//////////////////////////////////////////////

//update category

//////////////////////////////////////////////
export const updateCategory = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const main = req.body;
  const updateOne = await categoryModel.findByIdAndUpdate(id, main, {
    new: true,
  });
  if (!updateOne) return next(new httpError(404, "Invalid category name"));
  res.json(updateOne);
});

//////////////////////////////////////////////

//delete category

//////////////////////////////////////////////
export const deleteCategory = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const delOne = await categoryModel.findByIdAndDelete(id);
  if (!delOne) return next(new httpError(404, "Invalid category Id"));
  res.json(delOne);
});
