import express from "express";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { products } from "~/server/db/schema";

const router = express.Router();

router.get("/", async (req, res: any) => {
  try {
    const all = await db.query.products.findMany();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res: any) => {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, Number(req.params.id)),
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res: any) => {
  const { name, description, priceCents, inStock, images } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const [created] = await db
      .insert(products)
      .values({ name, description, priceCents, inStock, images })
      .returning();

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id", async (req, res: any) => {
  const { name, description, priceCents, inStock, images } = req.body;

  try {
    const [updated] = await db
      .update(products)
      .set({ name, description, priceCents, inStock, images })
      .where(eq(products.id, Number(req.params.id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res: any) => {
  try {
    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, Number(req.params.id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
