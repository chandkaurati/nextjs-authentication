import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const responce = NextResponse.json({
      message: "user logged out successfully",
      successs: true,
    });

    responce.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return responce;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
