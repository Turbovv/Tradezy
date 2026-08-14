import express, { type Express, type NextFunction, type Request, type Response } from "express";

import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import uploadRouter from "./routes/upload";
import cors from "cors";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/auth", authRouter);
  app.use("/products", productsRouter);
  app.use("/upload", uploadRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
