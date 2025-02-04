import { dbConnect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { genrateJwtAuthToken } from "@/utils/genrateToken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      throw new Error("all feilds are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user doesn't exist with this email", success: false },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "wrong credentials", success: false },
        { status: 400 }
      );
    }

    const TokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = genrateJwtAuthToken(TokenPayload);
    
    
    const responce = NextResponse.json({
      message: "logged in Successfully",
      success: true,
    });

    console.log(responce)

    responce.cookies.set("token", token, {
      httpOnly: true,
    });

    return responce;
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
