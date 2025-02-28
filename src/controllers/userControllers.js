import { createToken } from "../utils/createToken.js";

export const userRegister = async (req, res) => {
  return res.send("Registrado con éxito");
};

export const userLogin = async (req, res) => {
  const user = {
    _id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    cart: req.user.cart,
    email: req.user.email,
    role: req.user.role,
  };

  const token = createToken(user);
  try {
    res.cookie("authCookie", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.send(req.user);
  } catch (error) {
    return res.send("Error: " + error.message);
  }
};
export const userToken = (req, res) => {
  return res.send(req.user);
};
