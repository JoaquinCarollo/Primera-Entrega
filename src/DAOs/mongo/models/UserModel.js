import { Schema, SchemaTypes, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  cart: {
    type: SchemaTypes.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    default: "user",
  },
});

export default model("User", UserSchema);
