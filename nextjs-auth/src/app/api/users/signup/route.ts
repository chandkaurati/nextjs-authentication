import { dbConnect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // TODO handle the validation

    if(!username || !email || !password ){
      throw new Error("all feild are required")
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
     throw new Error("user Already Exist with this email")
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
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "user registered successfully",
      succcess: true,
      user : savedUser
    });
  } catch (error: any) {
    console.log(error.message)
    throw new Error(error.message)
  }
}
