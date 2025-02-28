import ProductsModel from "../models/ProductsModel.js";
export default class Product {
  constructor() {}
  getAllProducts = async () => {
    try {
      return await ProductsModel.find();
    } catch (error) {
      throw new Error("Error al obtener productos: " + error.message);
    }
  };

  getProductById = async (productId) => {
    try {
      return await ProductsModel.findById(productId);
    } catch (error) {
      throw new Error("Error al obtener producto: " + error.message);
    }
  };

  createProduct = async (productData) => {
    try {
      const newProduct = await ProductsModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error("Error al crear producto: " + error.message);
    }
  };

  updateProduct = async (productId, updatedData) => {
    try {
      const product = await ProductsModel.findById(productId);
      if (!product) throw new Error("Producto no encontrado");
      const updatedProduct = await ProductsModel.updateOne(
        { _id: product._id },
        { $set: updatedData }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Error al actualizar producto: " + error.message);
    }
  };

  deleteProduct = async (productId) => {
    try {
      const product = await ProductsModel.findById(productId);
      if (!product) throw new Error("Producto no encontrado");
      const deletedProduct = await ProductsModel.deleteOne({
        _id: product._id,
      });

      return deletedProduct;
    } catch (error) {
      throw new Error("Error al eliminar producto: " + error.message);
    }
  };
}
