export default class UserDTO {
  constructor(user) {
    this.first_name = user.nombre;
    this.last_name = user.apellido;
    this.email = user.correo;
    this.password = user.contraseña;
    this.role = user.rol;
    this.cart = user.cart;
  }
}
