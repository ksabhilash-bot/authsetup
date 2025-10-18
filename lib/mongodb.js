import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }
  const db = await mongoose.connect(mongoURI);
  isConnected = db.connections[0].readyState;
  console.log("MongoDB connected");
}
