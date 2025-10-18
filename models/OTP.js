import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // OTP expires in 10 minutes
});

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema);
