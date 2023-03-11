import { Router } from "express";
import {
  changeUserPhoneNumber,
  createUserAccount,
  loginUserAccount,
  verifyUserOtp,
} from "../controllers/user.controller.js";
import Validator from "../middlewares/validator.js";
import userPolice from "../middlewares/userPolice.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  Validator("userSignUpValidation"),
  createUserAccount
);
userRouter.post("/verify", Validator("userVerifyValidation"), verifyUserOtp);
userRouter.post("/signin", Validator("userLoginValidation"), loginUserAccount);
userRouter.post(
  "/change-number",
  userPolice,
  Validator("usesChangePhoneNumber"),
  changeUserPhoneNumber
);

export { userRouter };
