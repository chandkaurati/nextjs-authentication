import { dbConnect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const { username, email, password } = reqBody;

    // TODO handle the validation

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return NextResponse.json({
        message: "user already registered with thise email",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //  Send Verification Email

    await sendEmail({
      email: email,
      emailType: "VERIFICATION",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "user registered successfully",
      succcess: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
