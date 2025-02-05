import express from "express";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import passport from "passport";
import { connectDb } from "./config/dataBase.js";
import { initializePassport } from "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";

const app = express();
app.set("PORT", 3000);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
const mongoUrl =
  "mongodb+srv://Cluster0:54321@cluster0.f1rcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectDb(mongoUrl);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
initializePassport();
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

app.use("/api/user", userRoutes);
app.use("/", viewRoutes);

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
