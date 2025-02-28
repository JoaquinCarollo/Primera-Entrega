import Product from "../DAOs/mongo/classes/productClass.js";
import ProductRepository from "../repositories/productRepository.js";
const productService = new ProductRepository(new Product());
export const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    res.status(200).json({ message: "Lista de productos", product: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    if (!result)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json({ message: "Producto encontrado", product: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { nombre, precio, cantidad } = req.body;
    const newProduct = { nombre, precio, cantidad };
    const result = await productService.createProduct(newProduct);
    res
      .status(201)
      .json({ message: "Producto creado exitosamente", product: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, cantidad } = req.body;
    const updateData = { nombre, precio, cantidad };
    const updatedProduct = await productService.updateProduct(id, updateData);
    if (!updatedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};
