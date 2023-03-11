import { Router } from "express";
import {
  createUserAccount,
  verifyUserOtp,
} from "../controllers/user.controller.js";

import Validator from "../middlewares/validator.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  Validator("userSignUpValidation"),
  createUserAccount
);
userRouter.post("/verify", Validator("userVerifyValidation"), verifyUserOtp);

export { userRouter };
