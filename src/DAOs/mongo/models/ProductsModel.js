import { Schema, model } from "mongoose";

const ProductsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
export default model("Products", ProductsSchema);
