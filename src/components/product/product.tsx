"use client";

import { useEffect, useState } from "react";
import { getProducts } from "~/lib/api/products";

type Product = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  inStock: boolean;
  images: string[];
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-3 space-y-2"
        >
          <img
            src={product.images?.[0]}
            className="h-full w-full object-cover rounded"
          />

          <h2 className="font-bold">{product.name}</h2>

          <p className="text-sm text-gray-500">
            {product.description}
          </p>

          <p className="font-semibold">
            ${(product.priceCents / 100).toFixed(2)}
          </p>

          <p
            className={
              product.inStock
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {product.inStock
              ? "In Stock"
              : "Out of Stock"}
          </p>
        </div>
      ))}
    </div>
  );
}