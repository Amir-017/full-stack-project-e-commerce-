import { errorHandling } from "../utils/errorHandling.js";
import { httpError } from "../utils/httpError.js";
import jwt from "jsonwebtoken";
export const auth = errorHandling(async (req, res, next) => {
  const { authorization } = req.headers;
console.log(authorization);

  if (!authorization) return next(new httpError(401, "You must login first"));
  try {
    let decoded = jwt.verify(authorization, process.env.LOGIN_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;    
    next();
  } catch (error) {
    next(new httpError(401, "token expired"));
  }
});

export const authorize = (...roles) => {
  return errorHandling(async (req, res, next) => {
    if (!roles.includes(req.role))
      return next(new httpError(403, "You have no permission to doing that"));
    next();
  });
};
