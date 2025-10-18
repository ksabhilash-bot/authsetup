import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/mailer";
import TempUser from "@/models/TempUser";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, name } = await request.json();

    // Validate all required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Validate name
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists in permanent User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Check if there's an existing temp user
    const existingTempUser = await TempUser.findOne({ email });
    if (existingTempUser) {
      // Delete old temp user and allow resending OTP
      await TempUser.deleteOne({ email });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send OTP first
    const otpResult = await sendOTP(email);
    if (!otpResult.success) {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP. Please try again." },
        { status: 500 }
      );
    }

    // Create temp user only after OTP is sent successfully
    await TempUser.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);

    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "This email is already in use" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
