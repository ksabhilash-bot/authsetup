import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Temp user expires in 10 minutes
});

export default mongoose.models.TempUser ||
  mongoose.model("TempUser", tempUserSchema);
