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

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const existingTempUser = await TempUser.findOne({ email });
    if (existingTempUser) {
      return NextResponse.json({
        success: false,
        message: "OTP already sent to this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await TempUser.create({ name, email, password: hashedPassword });
    await sendOTP(email);

    return NextResponse.json(
      { success: true, message: "OTP sent to email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
