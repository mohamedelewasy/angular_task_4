import { Router } from "express";
import { Users } from "../models/user.model";
import { sign } from "jsonwebtoken";
import { verifyJwt } from "../middlewares/jwt.middleware";

const router = Router();

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw new Error("invalid body");
  const user = Users.findByUsername(username);
  if (!user || user.password !== password)
    throw new Error("incorrect credential");
  const token = sign({ username }, "secret");
  res.status(200).json({ token });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw new Error("invalid body");
  Users.create(username, password);
  res.status(201).json();
});

router.get("/verify", verifyJwt, (req, res) => {
  res.status(200).json({ username: res.locals.username });
});

export const authRoutes = router;
