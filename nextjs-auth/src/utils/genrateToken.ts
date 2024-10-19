import jwt from "jsonwebtoken";

interface payloadType {
  id: string;
  username: string;
  email: string;
}

export function genrateJwtAuthToken(payload: payloadType) {
  const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET!, {
    expiresIn: process.env.JWT_AUTH_EXPIRY,
  });
  return token;
}
