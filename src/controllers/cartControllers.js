import Cart from "../DAOs/mongo/classes/cartClass.js";
import Product from "../DAOs/mongo/classes/productClass.js";
import User from "../DAOs/mongo/classes/userClass.js";
import TicketModel from "../DAOs/mongo/models/TicketModel.js";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../repositories/userRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import ProductRepository from "../repositories/productRepository.js";
const cartService = new CartRepository(new Cart());
const userService = new UserRepository(new User());
const productService = new ProductRepository(new Product());
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await userService.getUserById(req.user._id);

    if (!user || !user.cart) {
      return res
        .status(404)
        .json({ message: "El usuario no tiene un carrito asignado" });
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedCart = await cartService.addToCart(
      user.cart._id,
      productId,
      quantity
    );

    res.json({ message: "Producto agregado al carrito", cart: updatedCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar al carrito", error: error.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await userService.getUserById(req.user._id);
    if (!user || !user.cart) {
      return res
        .status(404)
        .json({ message: "El usuario no tiene un carrito asignado" });
    }

    const cart = await cartService.getCartById(user.cart._id);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const updatedProducts = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    if (updatedProducts.length === cart.products.length) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    cart.products = updatedProducts;
    await cart.save();

    res.json({
      message: "Producto eliminado del carrito",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: error.message });
  }
};
export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    let productsToKeep = [];
    let unavailableProducts = [];

    for (const item of cart.products) {
      const product = await productService.getProductById(item.productId);

      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
      } else {
        unavailableProducts.push(item.productId);
        productsToKeep.push(item);
      }
    }

    if (totalAmount > 0) {
      const ticket = await TicketModel.create({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: req.user.email,
      });

      cart.products = productsToKeep;
      await cart.save();

      return res.json({
        message: "Compra realizada con éxito",
        ticket,
        remainingProducts: cart.products,
        unavailableProducts,
      });
    } else {
      return res.status(400).json({
        message: "No hay productos disponibles para comprar",
        unavailableProducts,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la compra", error: error.message });
  }
};
export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res
      .status(201)
      .json({ message: "Carrito creado exitosamente", cart: newCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el carrito", error: error.message });
  }
};
