import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedPayload: any = jwt.verify(token, process.env.JWT_AUTH_SECRET!);
    return decodedPayload.id;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
};
