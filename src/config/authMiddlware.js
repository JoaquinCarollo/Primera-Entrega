import jwt from "jsonwebtoken";
import User from "../DAOs/mongo/classes/userClass.js";

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
};
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado, solo administradores" });
  }
  next();
};
export const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Acceso denegado, solo usuarios" });
  }
  next();
};
