import { Router } from "express";
import {
  createUserAccount,
  verifyUserOtp,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", createUserAccount);
userRouter.post("/verify", verifyUserOtp);

export { userRouter };
