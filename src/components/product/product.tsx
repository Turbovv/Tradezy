import Link from "next/link";
import { getProducts, type CreateProductDTO } from "~/lib/api/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product: CreateProductDTO) => (
        <div key={product.id} className="border rounded-lg p-3 space-y-2">
          <img
            src={product.images?.[0]}
            className="h-full w-full object-cover rounded"
          />

          <Link href={`/products/${product.id}`}>
            View product
          </Link>

          <h2 className="font-bold">{product.name}</h2>

          <p className="text-sm text-gray-500">
            {product.description}
          </p>

          <p className="font-semibold">
            ${(product.priceCents / 100).toFixed(2)}
          </p>

          <p className={product.inStock ? "text-green-600" : "text-red-500"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      ))}
    </div>
  );
}