import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { markup } from "@/constants/email-markup";

interface sendEmailPrpos {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailPrpos) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "028c4ae54c75c3",
        pass: "91a54c286a5c2b",
      },
    });

    const mailOptions = {
      from: "chandkaurati@outlook.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset Your Password",
      html: markup({
        emailType: emailType,
        Url: `${process.env.DOMAIN}/${
          emailType === "VERIFY" ? "verifyemail" : "reset-password"
        }?token=${hashedToken}`,
        token: hashedToken,
      }),
    };

    const mailResponce = transport.sendMail(mailOptions);
    return mailResponce;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
