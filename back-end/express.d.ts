import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | admin | jwt.JwtPayload;
    }
  }
}
