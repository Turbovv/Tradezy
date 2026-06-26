import ProductCard from "~/components/product/product-card";
import { getProducts, type CreateProductDTO } from "~/lib/api/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product: CreateProductDTO) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
