"use client";
import { useState } from "react";
import EditProductForm from "~/app/products/[id]/components/edit-product";
import type { CreateProductDTO } from "~/lib/api/products";

export default function ProductDetails({
  product,
}: {
  product: CreateProductDTO & { id: number };
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{product.name}</h1>

        <button
          onClick={() => setIsEditing(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Edit
        </button>
      </div>

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

      <div className="mt-4 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Edit
        </button>
      </div>


      {isEditing && (
        <div className="mt-8 rounded-lg border p-6">
          <EditProductForm
            product={product}
            onClose={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}