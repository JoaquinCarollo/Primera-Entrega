import Cart from "../DAOs/mongo/classes/cartClass.js";
import User from "../DAOs/mongo/classes/userClass.js";
import UserRepository from "../repositories/userRepository.js";
import { createHash, isValidPassword } from "../utils/hashCreator.js";
import CartRepository from "../repositories/cartRepository.js";
const cartService = new CartRepository(new Cart());
const userService = new UserRepository(new User());

export const passportRegister = async (req, username, contraseña, done) => {
  const { nombre, apellido, correo, rol } = req.body;
  try {
    const newCart = await cartService.createCart();
    const user = await userService.getUser({ correo: username });
    if (user) {
      console.log("Usuario ya existe");
      return done(null, false);
    }
    const newUser = {
      nombre,
      apellido,
      correo,
      rol,
      contraseña: createHash(contraseña),
      cart: newCart._id,
    };

    const result = await userService.createUser(newUser);
    return done(null, result);
  } catch (error) {
    return done("Error al crear un usuario " + error.message);
  }
};
export const passportLogin = async (req, username, password, done) => {
  try {
    const userExist = await userService.getUser({ email: username });

    if (!userExist) return done(null, false);
    const isValid = await isValidPassword(password, userExist.password);

    if (!isValid) {
      return done(null, false);
    } else {
      return done(null, userExist);
    }
  } catch (error) {
    return done("Error al crear un usuario " + error.message);
  }
};
export const passportCurrent = async (jwt_payload, done) => {
  try {
    const user = await userService.getUserById(jwt_payload._id);
    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
