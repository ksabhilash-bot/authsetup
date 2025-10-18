import OTP from "@/models/OTP";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function sendOTP(email) {

  const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
  await OTP.create({ email, otp });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your FileShare OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4a90e2; font-size: 28px;">FileShare</h1>
                    <p style="color: #666; font-size: 16px;">Secure File Sharing Platform</p>
                </div>
                
                <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; text-align: center;">
                    <h2 style="color: #333; margin-bottom: 20px;">Your Verification Code</h2>
                    <div style="background-color: #4a90e2; color: white; font-size: 32px; font-weight: bold; 
                                padding: 15px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="color: #666; font-size: 14px; margin-top: 20px;">
                        This OTP is valid for <strong>10 minutes</strong>.<br>
                        If you didn't request this code, please ignore this email.
                    </p>
                </div>
                
                <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
                    <p>© ${new Date().getFullYear()} FileShare. All rights reserved.</p>
                </div>
            </div>
        `,
  };

  await transporter.sendMail(mailOptions);
}


export async function verifyOTP(email,providedOtp)
{
  try {
    const otpRecord = await OTP.findOne({email}).sort({createdAt:-1});
    if(!otpRecord || otpRecord.otp !== providedOtp)
    {
      return {success:false,message:"Invalid OTP"};
    }

    await OTP.deleteOne({_id:otpRecord._id});
    return {success:true,message:"OTP verified successfully"};

  } catch (error) {
    console.log("Error verifying OTP:", error);
    return {success:false,message:"Error verifying OTP"};
    
  }
}