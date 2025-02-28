import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import env from "./config/env.js";
import { connectDb } from "./config/dataBase.js";
import { initializePassport } from "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
app.set("PORT", env.port || 3000);

const mongoUrl =
  "mongodb+srv://Cluster0:54321@cluster0.f1rcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectDb(env.mongodb_url || mongoUrl);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
