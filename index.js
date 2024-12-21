import "dotenv/config";
import express from "express";
import handleTelegramBot from "./bot.js";
import helmet from "helmet";
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log("Error connecting DB");
  }
};

const app = express();

connectDatabase();
app.use(helmet());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Bot server is running");
});
app.post("/webhook", handleTelegramBot);

app.listen(process.env.PORT, () => {
  console.log("Bot server is running");
});
