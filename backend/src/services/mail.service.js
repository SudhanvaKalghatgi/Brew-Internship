import nodemailer from "nodemailer";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
});

export const sendResetPasswordEmail = async (to, resetUrl) => {
  try {
    const mailOptions = {
      from: `"Movie Insights Support" <${env.emailUser}>`,
      to,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset</h2>
          <p>You requested a password reset.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" 
             style="display:inline-block;padding:10px 20px;background:#111;color:#fff;text-decoration:none;border-radius:5px;">
             Reset Password
          </a>
          <p>This link will expire in 15 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, "Failed to send reset email");
  }
};