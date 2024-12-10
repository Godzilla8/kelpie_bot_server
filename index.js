import "dotenv/config";
import express from "express";
import handleTelegramBot from "./bot.js";
import helmet from "helmet";
const app = express();

import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.LIVE_MONGO_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log("Error connecting DB");
  }
};

connectDatabase();
app.use(helmet());
app.use(express.json());

app.post("/webhook", handleTelegramBot);

app.listen(process.env.PORT, () => {
  console.log("Bot server is running");
});
