import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { Users } from "../models/user.model";

export const verifyJwt: RequestHandler = (req, res, next) => {
  const token = (req.headers.authorization || "").split(" ")[1];
  if (!token) throw new Error("not authorized");
  try {
    const payload = verify(token, "secret") as { username: string };
    const user = Users.findByUsername(payload.username);
    if (!user) throw new Error("not authorized");
    res.locals.username = user.username;
  } catch (error) {
    throw new Error("bad token");
  }
  next();
};
