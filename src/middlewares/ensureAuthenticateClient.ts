import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) return response.status(401).json({message: "Token missing"})

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "019sad18392cca4293298aa01390139d") as IPayload;

    request.id_client = sub;

    return next();
  } catch (err) {
    return response.status(401).json({message: "Invalid token!"})
  }
}