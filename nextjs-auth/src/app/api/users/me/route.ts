import { dbConnect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getdataFromToken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "invalidToken" }, { status: 400 });
    }

    return NextResponse.json({
      message: "user fetched successfully",
      data: user,
    });
  } catch (error: any) {
    throw new Error(error.message)
  }
}
