import AddToCart from "./AddToCart";
import { prisma } from "@/lib";
import { products } from "@prisma/client";
import { getCart } from "@/app/actions";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export default async function page({ params }: { params: any }) {
  console.log(params);
  const { productId, name, locationId } = params;

  const product = (await prisma.products.findFirst({
    where: { id: productId },
  })) as products;
  console.log(product);

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
        }}>
        <AddToCart locationId={locationId} product={product} />
      </Box>
    </div>
  );
}
