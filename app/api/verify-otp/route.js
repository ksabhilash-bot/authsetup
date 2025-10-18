import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TempUser from "@/models/TempUser";
import User from "@/models/User";
import { verifyOTP } from "@/lib/mailer";

export async function POST(request) {
  try {
    await connectDB();
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({
        success: false,
        message: "Email and OTP are required",
      });
    }
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return NextResponse.json({
        success: false,
        message: "No signup request found for this email",
      });
    }

    const verificationResult = await verifyOTP(email, otp);

    if (!verificationResult.success) {
      return NextResponse.json({
        success: false,
        message: verificationResult.message,
      });
    }

    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
    });

    await TempUser.deleteOne({ email });
    return NextResponse.json({
      success: true,
      message: "OTP verified and user created successfully",
    });
  } catch (error) {
    console.error("Error in verify-otp route:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
