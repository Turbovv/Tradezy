"use client";

import Link from "next/link";
import type { CreateProductDTO } from "~/lib/api/products";

export default function ProductCard({ product }: { product: CreateProductDTO }) {
  return (
    <div className="space-y-2 rounded-lg border p-3">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        className="h-40 w-full rounded object-cover"
        alt={product.name}
      />

      <Link
        href={`/products/${product.id}`}
        className="text-blue-600 hover:underline"
      >
        View product
      </Link>

      <h2 className="font-bold">{product.name}</h2>

      <p className="text-sm text-gray-500">{product.description}</p>

      <p className="font-semibold">${(product.priceCents / 100).toFixed(2)}</p>

      <p className={product.inStock ? "text-green-600" : "text-red-500"}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
