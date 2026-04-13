import { validationResult } from "express-validator";
import { httpError } from "./httpError.js";
export const mainValidation = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new httpError(400, errors.array()[0].msg));
  }

  next();
};
