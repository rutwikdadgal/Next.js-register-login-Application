import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Cosmos DB!");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
