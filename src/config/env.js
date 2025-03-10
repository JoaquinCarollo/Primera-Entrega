import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  token_key: process.env.TOKEN_KEY,
};
