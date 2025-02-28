import UserDTO from "../DAOs/DTO/userDto.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUser = async (user) => {
    return await this.dao.getUser(user);
  };
  getUserById = async (id) => {
    return await this.dao.getUserById(id);
  };
  createUser = async (userData) => {
    const user = new UserDTO(userData);
    return await this.dao.createUser(user);
  };
}
