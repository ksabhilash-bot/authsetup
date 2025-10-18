import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/mailer";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid Credential" },
        { status: 400 }
      );
    }
    await sendOTP(email);
    return NextResponse.json(
      { success: true, message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
