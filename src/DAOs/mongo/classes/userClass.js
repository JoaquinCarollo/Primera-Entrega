import UserModel from "../models/UserModel.js";

export default class User {
  constructor() {}
  getUser = async (user) => {
    return await UserModel.findOne(user);
  };
  getUserById = async (id) => {
    return await UserModel.findById(id).populate("cart");
  };
  createUser = async (newUser) => {
    return await UserModel.create(newUser);
  };
}
