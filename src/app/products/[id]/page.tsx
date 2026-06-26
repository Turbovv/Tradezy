import ProductDetails from "~/components/product/productdetails/productdetails";
import { getProductById } from "~/lib/api/products";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  return <ProductDetails product={product} />;
}