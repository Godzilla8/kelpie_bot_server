import "dotenv/config";
import express from "express";
import handleTelegramBot from "./bot.js";
import helmet from "helmet";
import mongoose from "mongoose";
import User from "./model.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Set timeout to 30 seconds
      connectTimeoutMS: 30000, // Optional: Timeout for initial connection
    });
    console.log("DB connected!");
  } catch (error) {
    console.log("Error connecting DB", error);
  }
};
await connectDatabase();

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Bot server is running");
});
app.post("/webhook", handleTelegramBot);

app.get("/test", async (req, res, next) => {
  // const { referral_id } = req.body;
  try {
    const user = await User.findOne({ referral_id: "KelpieNetwork" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Bot server is running on ${process.env.PORT}`);
});
