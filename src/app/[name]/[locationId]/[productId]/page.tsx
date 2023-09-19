import AddToCart from "./AddToCart";
import { prisma } from "@/lib";
import { products } from "@prisma/client";
import { getCart } from "@/app/actions";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export default async function page({ params }: { params: any }) {
  // console.log(params);
  const { productId, name, locationId } = params;

  const product = (await prisma.products.findFirst({
    where: { id: productId },
  })) as products;

  const addonCategories = await prisma.addon_categories.findMany({
    where: { product_id: { has: productId } },
  });
  const addonCategoryId = addonCategories.map((item) => item.id);
  const addons = await prisma.addons.findMany({
    where: { addon_category_id: { in: addonCategoryId } },
  });

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
        }}>
        <AddToCart
          addonCategories={addonCategories}
          addons={addons}
          locationId={locationId}
          product={product}
        />
      </Box>
    </div>
  );
}
