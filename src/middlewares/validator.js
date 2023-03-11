// const Validators = require("../validations");
import ApiError from "../errors/ApiError.js";
import Validators from "../validations/index.js";

export default function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error.isJoi) {
        return ApiError.error(res, {
          message: error.message,
          friendlyMsg: "Validation error",
        });
      }
      return ApiError.internal(res, {
        friendlyMsg: "Internal error",
      });
    }
  };
}
