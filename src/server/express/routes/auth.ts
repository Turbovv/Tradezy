import express, { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import crypto from "crypto";

import { db } from "~/server/db";
import { user } from "~/server/db/schema";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const [createdUser] = await db
      .insert(user)
      .values({
        id: userId,
        name,
        email,
        password: hashedPassword,
        confirmed: true,
      })
      .returning();

 if (!createdUser) {
      console.error("Failed to create user");
      return res.status(500).json({ message: "Failed to create user" });
    }
       const token = jwt.sign({ userId: createdUser.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error: unknown) {
    console.error("register error", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return res.status(500).json({
      message: "Internal server error",
      error: message,
    });
  }
});

export default router;
