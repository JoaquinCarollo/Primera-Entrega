import CartsModel from "../models/CartsModel.js";

class Cart {
  constructor() {}
  getCarts = async () => {
    try {
      return await CartsModel.find();
    } catch (error) {
      throw new Error("Error al obtener el carrito: " + error.message);
    }
  };
  getCartById = async (cartId) => {
    try {
      return await CartsModel.findById(cartId);
    } catch (error) {
      throw new Error("Error al obtener el carrito: " + error.message);
    }
  };

  createCart = async () => {
    try {
      const newCart = await CartsModel.create({ product: [] });
      return newCart;
    } catch (error) {
      throw new Error("Error al crear el carrito: " + error.message);
    }
  };

  addToCart = async (cartId, productId, quantity) => {
    try {
      const cart = await CartsModel.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error al agregar producto al carrito: " + error.message);
    }
  };
}

export default Cart;
