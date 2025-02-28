import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  products: [],
});
export default model("Carts", CartSchema);
