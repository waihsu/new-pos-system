import AddToCart from "./AddToCart";
import { prisma } from "@/lib";
import { products } from "@prisma/client";
import { getCart } from "@/app/actions";
import Navbar from "@/components/Navbar";

export default async function page({ params }: { params: any }) {
  console.log(params);
  const { productId, name } = params;

  const product = (await prisma.products.findUnique({
    where: { id: productId },
  })) as products;
  console.log(product);

  return (
    <div>
      <Navbar name={name} />
      <AddToCart product={product} />
    </div>
  );
}
