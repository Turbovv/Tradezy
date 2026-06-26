"use client";

import type { CreateProductDTO } from "~/lib/api/products";

export default function ProductDetails({
  product,
}: {
  product: CreateProductDTO;
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <p className="mt-2 text-gray-600">{product.description}</p>

      <p className="mt-4 font-semibold">
        ${(product.priceCents / 100).toFixed(2)}
      </p>

      <div className="flex gap-2 mt-4">
        {product.images?.map((img) => (
          <img
            key={img}
            src={img}
            className="w-32 h-32 object-cover rounded"
          />
        ))}
      </div>

      <p className="mt-4">
        {product.inStock ? "In stock" : "Out of stock"}
      </p>
    </div>
  );
}