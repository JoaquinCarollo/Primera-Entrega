import { Router } from "express";
import passport from "passport";
import {
  userLogin,
  userRegister,
  userToken,
} from "../controllers/userControllers.js";

const userRoutes = Router();
userRoutes;
userRoutes.post(
  "/register",
  passport.authenticate("register", { session: false }),
  userRegister
);
userRoutes.post(
  "/login",
  passport.authenticate("login", {
    session: false,
  }),
  userLogin
);
userRoutes.get(
  "/current",
  passport.authenticate("current", { session: false }),
  userToken
);
export default userRoutes;
