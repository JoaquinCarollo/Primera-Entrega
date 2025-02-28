import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import env from "./env.js";
import User from "../DAOs/mongo/classes/userClass.js";
import {
  passportLogin,
  passportRegister,
  passportCurrent,
} from "../controllers/passportControllers.js";

const userService = new User();
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;
export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "correo",
        passwordField: "contraseña",
      },
      passportRegister
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      passportLogin
    )
  );
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "clave-secreta" || env.token_key,
      },
      passportCurrent
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
  });
};
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    {
      token = req.cookies["authCookie"];
    }
  }

  return token;
};
