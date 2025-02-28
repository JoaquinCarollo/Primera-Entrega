export default class ProductDTO {
  constructor(product) {
    this.name = product.nombre;
    this.price = product.precio;
    this.stock = product.cantidad;
  }
}
