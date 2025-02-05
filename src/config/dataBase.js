import mongoose from "mongoose";
export const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("Conexion NO exitosa", error);
  }
};
